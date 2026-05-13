import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from '../../configs/database';
import { AppError, NotFoundError, ForbiddenError } from '../../middlewares/error.middleware';
import { OrderStatus, PaymentMethod, PaymentStatus } from '@prisma/client';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

interface CreateOrderDto {
  addressId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  notes?: string;
}

export class OrderService {
  async createOrder(userId: string, dto: CreateOrderDto) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: { images: { where: { isPrimary: true }, take: 1 } },
            },
            variant: { include: { inventory: true } },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError('Cart is empty', 400);
    }

    const address = await prisma.address.findFirst({
      where: { id: dto.addressId, userId },
    });
    if (!address) throw new NotFoundError('Address');

    // Validate stock and calculate subtotal
    let subtotal = 0;
    for (const item of cart.items) {
      const stock = item.variant?.inventory?.quantity || 0;
      if (stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${item.product.name}`, 400);
      }
      const price = Number(item.variant?.price || 0);
      subtotal += price * item.quantity;
    }

    // Apply coupon
    let discountAmount = 0;
    let coupon = null;
    if (dto.couponCode) {
      coupon = await this.applyCoupon(dto.couponCode, userId, subtotal);
      discountAmount = coupon.discount;
    }

    // Shipping & tax
    const shippingAmount = subtotal > 499 ? 0 : 49;
    const taxRate = 0.18;
    const taxableAmount = subtotal - discountAmount + shippingAmount;
    const taxAmount = Math.round(taxableAmount * taxRate * 100) / 100;
    const totalAmount = taxableAmount + taxAmount;

    // Generate order number
    const orderNumber = `LN${Date.now()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId: dto.addressId,
          status: OrderStatus.PENDING,
          subtotal,
          discountAmount,
          shippingAmount,
          taxAmount,
          totalAmount,
          couponId: coupon?.id,
          couponCode: dto.couponCode,
          notes: dto.notes,
          items: {
            create: cart.items.map(item => ({
              productId: item.productId,
              variantId: item.variantId,
              productName: item.product.name,
              sku: item.variant?.sku || '',
              image: item.product.images[0]?.url,
              price: Number(item.variant?.price || 0),
              quantity: item.quantity,
              totalPrice: Number(item.variant?.price || 0) * item.quantity,
            })),
          },
          timeline: {
            create: {
              status: 'PENDING',
              message: 'Order placed successfully',
            },
          },
        },
        include: { items: true, address: true },
      });

      // Reserve inventory
      for (const item of cart.items) {
        if (item.variantId) {
          await tx.inventory.update({
            where: { variantId: item.variantId },
            data: {
              reservedQuantity: { increment: item.quantity },
              quantity: { decrement: item.quantity },
            },
          });
        }
      }

      // Update coupon usage
      if (coupon) {
        await tx.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    // Create Razorpay order if not COD
    let razorpayOrder = null;
    if (dto.paymentMethod !== PaymentMethod.COD) {
      const isDummyKey = !process.env.RAZORPAY_KEY_ID ||
        process.env.RAZORPAY_KEY_ID.includes('your_key') ||
        process.env.RAZORPAY_KEY_ID.includes('dummy') ||
        process.env.RAZORPAY_KEY_ID === 'rzp_test_your_key_here';

      if (isDummyKey) {
        // Mock Razorpay order for development/demo
        razorpayOrder = {
          id: `order_DEMO${Date.now()}`,
          amount: Math.round(totalAmount * 100),
          currency: 'INR',
          receipt: orderNumber,
        };
      } else {
        razorpayOrder = await razorpay.orders.create({
          amount: Math.round(totalAmount * 100),
          currency: 'INR',
          receipt: orderNumber,
          notes: { orderId: order.id, userId },
        });
      }

      await prisma.payment.create({
        data: {
          orderId: order.id,
          method: dto.paymentMethod,
          status: PaymentStatus.PENDING,
          amount: totalAmount,
          razorpayOrderId: razorpayOrder.id,
        },
      });
    } else {
      await prisma.payment.create({
        data: {
          orderId: order.id,
          method: PaymentMethod.COD,
          status: PaymentStatus.PENDING,
          amount: totalAmount,
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.CONFIRMED },
      });
    }

    return { order, razorpayOrder };
  }

  async verifyPayment(orderId: string, razorpayPaymentId: string, razorpaySignature: string, userId: string) {
    const payment = await prisma.payment.findFirst({ where: { orderId } });
    if (!payment?.razorpayOrderId) throw new AppError('Payment not found', 404);

    const isDummyKey = !process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_KEY_SECRET.includes('your_') ||
      process.env.RAZORPAY_KEY_SECRET.includes('dummy') ||
      razorpayPaymentId.startsWith('pay_DEMO');

    if (!isDummyKey) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(`${payment.razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

      if (expectedSignature !== razorpaySignature) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.FAILED, failureReason: 'Signature mismatch' },
        });
        throw new AppError('Payment verification failed', 400);
      }
    }

    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.CAPTURED,
          razorpayPaymentId,
          razorpaySignature,
        },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CONFIRMED },
      }),
      prisma.orderTimeline.create({
        data: {
          orderId,
          status: 'CONFIRMED',
          message: 'Payment received. Order confirmed.',
        },
      }),
    ]);

    return true;
  }

  async getUserOrders(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [total, orders] = await Promise.all([
      prisma.order.count({ where: { userId } }),
      prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: { select: { name: true } },
            },
          },
          payments: { select: { status: true, method: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);
    return { orders, total };
  }

  async getOrderById(orderId: string, userId?: string) {
    const where: any = { id: orderId };
    if (userId) where.userId = userId;

    const order = await prisma.order.findFirst({
      where,
      include: {
        items: true,
        address: true,
        payments: true,
        timeline: { orderBy: { createdAt: 'asc' } },
        user: { select: { firstName: true, lastName: true, email: true, phone: true } },
      },
    });
    if (!order) throw new NotFoundError('Order');
    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, message: string, adminId: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundError('Order');

    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: {
          status,
          ...(status === OrderStatus.DELIVERED && { deliveredAt: new Date() }),
          ...(status === OrderStatus.CANCELLED && { cancelledAt: new Date() }),
        },
      }),
      prisma.orderTimeline.create({
        data: { orderId, status, message, createdBy: adminId },
      }),
    ]);

    if (status === OrderStatus.CANCELLED) {
      await this.restoreInventory(orderId);
    }
  }

  async cancelOrder(orderId: string, userId: string, reason: string) {
    const order = await prisma.order.findFirst({ where: { id: orderId, userId } });
    if (!order) throw new NotFoundError('Order');

    const cancellableStatuses: OrderStatus[] = [OrderStatus.PENDING, OrderStatus.CONFIRMED];
    if (!cancellableStatuses.includes(order.status)) {
      throw new AppError('Order cannot be cancelled at this stage', 400);
    }

    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CANCELLED,
          cancelledAt: new Date(),
          cancelReason: reason,
        },
      }),
      prisma.orderTimeline.create({
        data: { orderId, status: 'CANCELLED', message: `Cancelled: ${reason}`, createdBy: userId },
      }),
    ]);

    await this.restoreInventory(orderId);
  }

  async requestReturn(orderId: string, userId: string, reason: string, description?: string) {
    const order = await prisma.order.findFirst({ where: { id: orderId, userId } });
    if (!order) throw new NotFoundError('Order');
    if (order.status !== OrderStatus.DELIVERED) {
      throw new AppError('Only delivered orders can be returned', 400);
    }

    const deliveredDate = order.deliveredAt || order.updatedAt;
    const daysSinceDelivery = Math.floor((Date.now() - deliveredDate.getTime()) / 86400000);
    if (daysSinceDelivery > 7) throw new AppError('Return window (7 days) has expired', 400);

    const returnRequest = await prisma.returnRequest.create({
      data: {
        orderId,
        userId,
        reason,
        description,
        refundAmount: order.totalAmount,
      },
    });

    await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.RETURN_REQUESTED },
    });

    return returnRequest;
  }

  async getAllOrders(filters: any) {
    const { page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters.status) where.status = filters.status;
    if (filters.userId) where.userId = filters.userId;
    if (filters.search) {
      where.OR = [
        { orderNumber: { contains: filters.search } },
        { user: { email: { contains: filters.search, mode: 'insensitive' } } },
      ];
    }
    if (filters.from) where.createdAt = { gte: new Date(filters.from) };
    if (filters.to) where.createdAt = { ...where.createdAt, lte: new Date(filters.to) };

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          items: { select: { productName: true, quantity: true, totalPrice: true } },
          payments: { select: { status: true, method: true } },
          address: { select: { city: true, state: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return { orders, total };
  }

  private async applyCoupon(code: string, userId: string, subtotal: number) {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase(), isActive: true },
    });

    if (!coupon) throw new AppError('Invalid coupon code', 400);
    if (new Date() > coupon.endDate) throw new AppError('Coupon has expired', 400);
    if (coupon.startDate > new Date()) throw new AppError('Coupon is not yet active', 400);
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new AppError('Coupon usage limit reached', 400);
    }
    if (coupon.minOrderAmount && subtotal < Number(coupon.minOrderAmount)) {
      throw new AppError(`Minimum order amount is ₹${coupon.minOrderAmount}`, 400);
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = (subtotal * Number(coupon.discountValue)) / 100;
      if (coupon.maxDiscountAmount) {
        discount = Math.min(discount, Number(coupon.maxDiscountAmount));
      }
    } else if (coupon.discountType === 'FLAT') {
      discount = Math.min(Number(coupon.discountValue), subtotal);
    }

    return { id: coupon.id, discount };
  }

  private async restoreInventory(orderId: string) {
    const orderItems = await prisma.orderItem.findMany({ where: { orderId } });
    for (const item of orderItems) {
      if (item.variantId) {
        await prisma.inventory.update({
          where: { variantId: item.variantId },
          data: {
            quantity: { increment: item.quantity },
            reservedQuantity: { decrement: item.quantity },
          },
        });
      }
    }
  }
}

export const orderService = new OrderService();
