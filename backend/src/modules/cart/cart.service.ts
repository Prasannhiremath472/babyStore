import { prisma } from '../../configs/database';
import { AppError, NotFoundError } from '../../middlewares/error.middleware';

export class CartService {
  async getCart(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
                brand: { select: { name: true } },
              },
            },
            variant: { include: { inventory: true } },
          },
        },
      },
    });

    if (!cart) return this.createCart(userId);

    const items = cart.items.map(item => ({
      ...item,
      price: Number(item.variant?.price || 0),
      comparePrice: item.variant?.comparePrice ? Number(item.variant.comparePrice) : null,
      stock: item.variant?.inventory?.quantity || 0,
      isInStock: (item.variant?.inventory?.quantity || 0) >= item.quantity,
    }));

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

    return { ...cart, items, subtotal, itemCount: items.reduce((s, i) => s + i.quantity, 0) };
  }

  async addItem(userId: string, productId: string, variantId: string, quantity: number) {
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) cart = await this.createCart(userId);

    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { inventory: true },
    });
    if (!variant) throw new NotFoundError('Product variant');

    const availableStock = (variant.inventory?.quantity || 0) - (variant.inventory?.reservedQuantity || 0);
    if (availableStock < quantity) {
      throw new AppError(`Only ${availableStock} items available in stock`, 400);
    }

    const existing = await prisma.cartItem.findUnique({
      where: { cartId_variantId: { cartId: cart.id, variantId } },
    });

    if (existing) {
      const newQty = existing.quantity + quantity;
      if (availableStock < newQty) {
        throw new AppError(`Only ${availableStock} items available`, 400);
      }
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: newQty },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, variantId, quantity },
      });
    }

    return this.getCart(userId);
  }

  async updateItem(userId: string, itemId: string, quantity: number) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundError('Cart');

    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
      include: { variant: { include: { inventory: true } } },
    });
    if (!item) throw new NotFoundError('Cart item');

    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
    } else {
      const stock = item.variant?.inventory?.quantity || 0;
      if (stock < quantity) throw new AppError(`Only ${stock} items available`, 400);
      await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
    }

    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundError('Cart');

    await prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
  }

  private async createCart(userId: string) {
    return prisma.cart.create({ where: { userId }, data: { userId }, include: { items: true } } as any);
  }
}

export const cartService = new CartService();
