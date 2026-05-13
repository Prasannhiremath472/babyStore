"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.OrderService = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../../configs/database");
const error_middleware_1 = require("../../middlewares/error.middleware");
const client_1 = require("@prisma/client");
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
class OrderService {
    async createOrder(userId, dto) {
        const cart = await database_1.prisma.cart.findUnique({
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
            throw new error_middleware_1.AppError('Cart is empty', 400);
        }
        const address = await database_1.prisma.address.findFirst({
            where: { id: dto.addressId, userId },
        });
        if (!address)
            throw new error_middleware_1.NotFoundError('Address');
        let subtotal = 0;
        for (const item of cart.items) {
            const stock = item.variant?.inventory?.quantity || 0;
            if (stock < item.quantity) {
                throw new error_middleware_1.AppError(`Insufficient stock for ${item.product.name}`, 400);
            }
            const price = Number(item.variant?.price || 0);
            subtotal += price * item.quantity;
        }
        let discountAmount = 0;
        let coupon = null;
        if (dto.couponCode) {
            coupon = await this.applyCoupon(dto.couponCode, userId, subtotal);
            discountAmount = coupon.discount;
        }
        const shippingAmount = subtotal > 499 ? 0 : 49;
        const taxRate = 0.18;
        const taxableAmount = subtotal - discountAmount + shippingAmount;
        const taxAmount = Math.round(taxableAmount * taxRate * 100) / 100;
        const totalAmount = taxableAmount + taxAmount;
        const orderNumber = `LN${Date.now()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
        const order = await database_1.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    orderNumber,
                    userId,
                    addressId: dto.addressId,
                    status: client_1.OrderStatus.PENDING,
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
            if (coupon) {
                await tx.coupon.update({
                    where: { id: coupon.id },
                    data: { usedCount: { increment: 1 } },
                });
            }
            await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
            return newOrder;
        });
        let razorpayOrder = null;
        if (dto.paymentMethod !== client_1.PaymentMethod.COD) {
            const isDummyKey = !process.env.RAZORPAY_KEY_ID ||
                process.env.RAZORPAY_KEY_ID.includes('your_key') ||
                process.env.RAZORPAY_KEY_ID.includes('dummy') ||
                process.env.RAZORPAY_KEY_ID === 'rzp_test_your_key_here';
            if (isDummyKey) {
                razorpayOrder = {
                    id: `order_DEMO${Date.now()}`,
                    amount: Math.round(totalAmount * 100),
                    currency: 'INR',
                    receipt: orderNumber,
                };
            }
            else {
                razorpayOrder = await razorpay.orders.create({
                    amount: Math.round(totalAmount * 100),
                    currency: 'INR',
                    receipt: orderNumber,
                    notes: { orderId: order.id, userId },
                });
            }
            await database_1.prisma.payment.create({
                data: {
                    orderId: order.id,
                    method: dto.paymentMethod,
                    status: client_1.PaymentStatus.PENDING,
                    amount: totalAmount,
                    razorpayOrderId: razorpayOrder.id,
                },
            });
        }
        else {
            await database_1.prisma.payment.create({
                data: {
                    orderId: order.id,
                    method: client_1.PaymentMethod.COD,
                    status: client_1.PaymentStatus.PENDING,
                    amount: totalAmount,
                },
            });
            await database_1.prisma.order.update({
                where: { id: order.id },
                data: { status: client_1.OrderStatus.CONFIRMED },
            });
        }
        return { order, razorpayOrder };
    }
    async verifyPayment(orderId, razorpayPaymentId, razorpaySignature, userId) {
        const payment = await database_1.prisma.payment.findFirst({ where: { orderId } });
        if (!payment?.razorpayOrderId)
            throw new error_middleware_1.AppError('Payment not found', 404);
        const isDummyKey = !process.env.RAZORPAY_KEY_SECRET ||
            process.env.RAZORPAY_KEY_SECRET.includes('your_') ||
            process.env.RAZORPAY_KEY_SECRET.includes('dummy') ||
            razorpayPaymentId.startsWith('pay_DEMO');
        if (!isDummyKey) {
            const expectedSignature = crypto_1.default
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(`${payment.razorpayOrderId}|${razorpayPaymentId}`)
                .digest('hex');
            if (expectedSignature !== razorpaySignature) {
                await database_1.prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: client_1.PaymentStatus.FAILED, failureReason: 'Signature mismatch' },
                });
                throw new error_middleware_1.AppError('Payment verification failed', 400);
            }
        }
        await database_1.prisma.$transaction([
            database_1.prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: client_1.PaymentStatus.CAPTURED,
                    razorpayPaymentId,
                    razorpaySignature,
                },
            }),
            database_1.prisma.order.update({
                where: { id: orderId },
                data: { status: client_1.OrderStatus.CONFIRMED },
            }),
            database_1.prisma.orderTimeline.create({
                data: {
                    orderId,
                    status: 'CONFIRMED',
                    message: 'Payment received. Order confirmed.',
                },
            }),
        ]);
        return true;
    }
    async getUserOrders(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [total, orders] = await Promise.all([
            database_1.prisma.order.count({ where: { userId } }),
            database_1.prisma.order.findMany({
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
    async getOrderById(orderId, userId) {
        const where = { id: orderId };
        if (userId)
            where.userId = userId;
        const order = await database_1.prisma.order.findFirst({
            where,
            include: {
                items: true,
                address: true,
                payments: true,
                timeline: { orderBy: { createdAt: 'asc' } },
                user: { select: { firstName: true, lastName: true, email: true, phone: true } },
            },
        });
        if (!order)
            throw new error_middleware_1.NotFoundError('Order');
        return order;
    }
    async updateOrderStatus(orderId, status, message, adminId) {
        const order = await database_1.prisma.order.findUnique({ where: { id: orderId } });
        if (!order)
            throw new error_middleware_1.NotFoundError('Order');
        await database_1.prisma.$transaction([
            database_1.prisma.order.update({
                where: { id: orderId },
                data: {
                    status,
                    ...(status === client_1.OrderStatus.DELIVERED && { deliveredAt: new Date() }),
                    ...(status === client_1.OrderStatus.CANCELLED && { cancelledAt: new Date() }),
                },
            }),
            database_1.prisma.orderTimeline.create({
                data: { orderId, status, message, createdBy: adminId },
            }),
        ]);
        if (status === client_1.OrderStatus.CANCELLED) {
            await this.restoreInventory(orderId);
        }
    }
    async cancelOrder(orderId, userId, reason) {
        const order = await database_1.prisma.order.findFirst({ where: { id: orderId, userId } });
        if (!order)
            throw new error_middleware_1.NotFoundError('Order');
        const cancellableStatuses = [client_1.OrderStatus.PENDING, client_1.OrderStatus.CONFIRMED];
        if (!cancellableStatuses.includes(order.status)) {
            throw new error_middleware_1.AppError('Order cannot be cancelled at this stage', 400);
        }
        await database_1.prisma.$transaction([
            database_1.prisma.order.update({
                where: { id: orderId },
                data: {
                    status: client_1.OrderStatus.CANCELLED,
                    cancelledAt: new Date(),
                    cancelReason: reason,
                },
            }),
            database_1.prisma.orderTimeline.create({
                data: { orderId, status: 'CANCELLED', message: `Cancelled: ${reason}`, createdBy: userId },
            }),
        ]);
        await this.restoreInventory(orderId);
    }
    async requestReturn(orderId, userId, reason, description) {
        const order = await database_1.prisma.order.findFirst({ where: { id: orderId, userId } });
        if (!order)
            throw new error_middleware_1.NotFoundError('Order');
        if (order.status !== client_1.OrderStatus.DELIVERED) {
            throw new error_middleware_1.AppError('Only delivered orders can be returned', 400);
        }
        const deliveredDate = order.deliveredAt || order.updatedAt;
        const daysSinceDelivery = Math.floor((Date.now() - deliveredDate.getTime()) / 86400000);
        if (daysSinceDelivery > 7)
            throw new error_middleware_1.AppError('Return window (7 days) has expired', 400);
        const returnRequest = await database_1.prisma.returnRequest.create({
            data: {
                orderId,
                userId,
                reason,
                description,
                refundAmount: order.totalAmount,
            },
        });
        await database_1.prisma.order.update({
            where: { id: orderId },
            data: { status: client_1.OrderStatus.RETURN_REQUESTED },
        });
        return returnRequest;
    }
    async getAllOrders(filters) {
        const { page = 1, limit = 20 } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (filters.status)
            where.status = filters.status;
        if (filters.userId)
            where.userId = filters.userId;
        if (filters.search) {
            where.OR = [
                { orderNumber: { contains: filters.search } },
                { user: { email: { contains: filters.search, mode: 'insensitive' } } },
            ];
        }
        if (filters.from)
            where.createdAt = { gte: new Date(filters.from) };
        if (filters.to)
            where.createdAt = { ...where.createdAt, lte: new Date(filters.to) };
        const [total, orders] = await Promise.all([
            database_1.prisma.order.count({ where }),
            database_1.prisma.order.findMany({
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
    async applyCoupon(code, userId, subtotal) {
        const coupon = await database_1.prisma.coupon.findUnique({
            where: { code: code.toUpperCase(), isActive: true },
        });
        if (!coupon)
            throw new error_middleware_1.AppError('Invalid coupon code', 400);
        if (new Date() > coupon.endDate)
            throw new error_middleware_1.AppError('Coupon has expired', 400);
        if (coupon.startDate > new Date())
            throw new error_middleware_1.AppError('Coupon is not yet active', 400);
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            throw new error_middleware_1.AppError('Coupon usage limit reached', 400);
        }
        if (coupon.minOrderAmount && subtotal < Number(coupon.minOrderAmount)) {
            throw new error_middleware_1.AppError(`Minimum order amount is ₹${coupon.minOrderAmount}`, 400);
        }
        let discount = 0;
        if (coupon.discountType === 'PERCENTAGE') {
            discount = (subtotal * Number(coupon.discountValue)) / 100;
            if (coupon.maxDiscountAmount) {
                discount = Math.min(discount, Number(coupon.maxDiscountAmount));
            }
        }
        else if (coupon.discountType === 'FLAT') {
            discount = Math.min(Number(coupon.discountValue), subtotal);
        }
        return { id: coupon.id, discount };
    }
    async restoreInventory(orderId) {
        const orderItems = await database_1.prisma.orderItem.findMany({ where: { orderId } });
        for (const item of orderItems) {
            if (item.variantId) {
                await database_1.prisma.inventory.update({
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
exports.OrderService = OrderService;
exports.orderService = new OrderService();
//# sourceMappingURL=order.service.js.map