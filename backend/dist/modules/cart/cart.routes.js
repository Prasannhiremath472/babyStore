"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', cart_controller_1.cartController.getCart.bind(cart_controller_1.cartController));
router.post('/items', cart_controller_1.cartController.addItem.bind(cart_controller_1.cartController));
router.put('/items/:itemId', cart_controller_1.cartController.updateItem.bind(cart_controller_1.cartController));
router.delete('/items/:itemId', cart_controller_1.cartController.removeItem.bind(cart_controller_1.cartController));
router.delete('/', cart_controller_1.cartController.clearCart.bind(cart_controller_1.cartController));
exports.default = router;
//# sourceMappingURL=cart.routes.js.map