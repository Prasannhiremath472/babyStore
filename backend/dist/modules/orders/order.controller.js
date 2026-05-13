"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const response_util_1 = require("../../utils/response.util");
class OrderController {
    async createOrder(req, res) {
        const result = await order_service_1.orderService.createOrder(req.user.id, req.body);
        (0, response_util_1.sendCreated)(res, result, 'Order created successfully');
    }
    async verifyPayment(req, res) {
        const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
        await order_service_1.orderService.verifyPayment(orderId, razorpayPaymentId, razorpaySignature, req.user.id);
        (0, response_util_1.sendSuccess)(res, null, 'Payment verified successfully');
    }
    async getUserOrders(req, res) {
        const { page, limit } = req.query;
        const result = await order_service_1.orderService.getUserOrders(req.user.id, Number(page) || 1, Number(limit) || 10);
        (0, response_util_1.sendSuccess)(res, result);
    }
    async getOrder(req, res) {
        const order = await order_service_1.orderService.getOrderById(req.params.id, req.user.id);
        (0, response_util_1.sendSuccess)(res, order);
    }
    async cancelOrder(req, res) {
        await order_service_1.orderService.cancelOrder(req.params.id, req.user.id, req.body.reason);
        (0, response_util_1.sendSuccess)(res, null, 'Order cancelled');
    }
    async requestReturn(req, res) {
        const result = await order_service_1.orderService.requestReturn(req.params.id, req.user.id, req.body.reason, req.body.description);
        (0, response_util_1.sendCreated)(res, result, 'Return request submitted');
    }
    async getAllOrders(req, res) {
        const result = await order_service_1.orderService.getAllOrders(req.query);
        res.json({ success: true, ...result });
    }
    async getOrderAdmin(req, res) {
        const order = await order_service_1.orderService.getOrderById(req.params.id);
        (0, response_util_1.sendSuccess)(res, order);
    }
    async updateStatus(req, res) {
        await order_service_1.orderService.updateOrderStatus(req.params.id, req.body.status, req.body.message, req.user.id);
        (0, response_util_1.sendSuccess)(res, null, 'Order status updated');
    }
}
exports.OrderController = OrderController;
exports.orderController = new OrderController();
//# sourceMappingURL=order.controller.js.map