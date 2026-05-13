"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, order_controller_1.orderController.createOrder.bind(order_controller_1.orderController));
router.post('/verify-payment', auth_middleware_1.authenticate, order_controller_1.orderController.verifyPayment.bind(order_controller_1.orderController));
router.get('/my-orders', auth_middleware_1.authenticate, order_controller_1.orderController.getUserOrders.bind(order_controller_1.orderController));
router.get('/my-orders/:id', auth_middleware_1.authenticate, order_controller_1.orderController.getOrder.bind(order_controller_1.orderController));
router.patch('/my-orders/:id/cancel', auth_middleware_1.authenticate, order_controller_1.orderController.cancelOrder.bind(order_controller_1.orderController));
router.post('/my-orders/:id/return', auth_middleware_1.authenticate, order_controller_1.orderController.requestReturn.bind(order_controller_1.orderController));
router.get('/admin/all', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, order_controller_1.orderController.getAllOrders.bind(order_controller_1.orderController));
router.get('/admin/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, order_controller_1.orderController.getOrderAdmin.bind(order_controller_1.orderController));
router.patch('/admin/:id/status', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, order_controller_1.orderController.updateStatus.bind(order_controller_1.orderController));
exports.default = router;
//# sourceMappingURL=order.routes.js.map