"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = exports.CartService = void 0;
const database_1 = require("../../configs/database");
const error_middleware_1 = require("../../middlewares/error.middleware");
class CartService {
    async getCart(userId) {
        const cart = await database_1.prisma.cart.findUnique({
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
        if (!cart)
            return this.createCart(userId);
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
    async addItem(userId, productId, variantId, quantity) {
        let cart = await database_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            cart = await this.createCart(userId);
        const variant = await database_1.prisma.productVariant.findUnique({
            where: { id: variantId },
            include: { inventory: true },
        });
        if (!variant)
            throw new error_middleware_1.NotFoundError('Product variant');
        const availableStock = (variant.inventory?.quantity || 0) - (variant.inventory?.reservedQuantity || 0);
        if (availableStock < quantity) {
            throw new error_middleware_1.AppError(`Only ${availableStock} items available in stock`, 400);
        }
        const existing = await database_1.prisma.cartItem.findUnique({
            where: { cartId_variantId: { cartId: cart.id, variantId } },
        });
        if (existing) {
            const newQty = existing.quantity + quantity;
            if (availableStock < newQty) {
                throw new error_middleware_1.AppError(`Only ${availableStock} items available`, 400);
            }
            await database_1.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: newQty },
            });
        }
        else {
            await database_1.prisma.cartItem.create({
                data: { cartId: cart.id, productId, variantId, quantity },
            });
        }
        return this.getCart(userId);
    }
    async updateItem(userId, itemId, quantity) {
        const cart = await database_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new error_middleware_1.NotFoundError('Cart');
        const item = await database_1.prisma.cartItem.findFirst({
            where: { id: itemId, cartId: cart.id },
            include: { variant: { include: { inventory: true } } },
        });
        if (!item)
            throw new error_middleware_1.NotFoundError('Cart item');
        if (quantity === 0) {
            await database_1.prisma.cartItem.delete({ where: { id: itemId } });
        }
        else {
            const stock = item.variant?.inventory?.quantity || 0;
            if (stock < quantity)
                throw new error_middleware_1.AppError(`Only ${stock} items available`, 400);
            await database_1.prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
        }
        return this.getCart(userId);
    }
    async removeItem(userId, itemId) {
        const cart = await database_1.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new error_middleware_1.NotFoundError('Cart');
        await database_1.prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
        return this.getCart(userId);
    }
    async clearCart(userId) {
        const cart = await database_1.prisma.cart.findUnique({ where: { userId } });
        if (cart) {
            await database_1.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }
    }
    async createCart(userId) {
        return database_1.prisma.cart.create({ where: { userId }, data: { userId }, include: { items: true } });
    }
}
exports.CartService = CartService;
exports.cartService = new CartService();
//# sourceMappingURL=cart.service.js.map