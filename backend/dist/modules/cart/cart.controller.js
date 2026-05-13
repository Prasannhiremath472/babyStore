"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = exports.CartController = void 0;
const cart_service_1 = require("./cart.service");
const response_util_1 = require("../../utils/response.util");
class CartController {
    async getCart(req, res) {
        const cart = await cart_service_1.cartService.getCart(req.user.id);
        (0, response_util_1.sendSuccess)(res, cart);
    }
    async addItem(req, res) {
        const { productId, variantId, quantity = 1 } = req.body;
        const cart = await cart_service_1.cartService.addItem(req.user.id, productId, variantId, quantity);
        (0, response_util_1.sendSuccess)(res, cart, 'Item added to cart');
    }
    async updateItem(req, res) {
        const { quantity } = req.body;
        const cart = await cart_service_1.cartService.updateItem(req.user.id, req.params.itemId, quantity);
        (0, response_util_1.sendSuccess)(res, cart, 'Cart updated');
    }
    async removeItem(req, res) {
        const cart = await cart_service_1.cartService.removeItem(req.user.id, req.params.itemId);
        (0, response_util_1.sendSuccess)(res, cart, 'Item removed');
    }
    async clearCart(req, res) {
        await cart_service_1.cartService.clearCart(req.user.id);
        (0, response_util_1.sendSuccess)(res, null, 'Cart cleared');
    }
}
exports.CartController = CartController;
exports.cartController = new CartController();
//# sourceMappingURL=cart.controller.js.map