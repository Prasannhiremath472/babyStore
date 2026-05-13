import { Request, Response } from 'express';
import { orderService } from './order.service';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.util';

export class OrderController {
  async createOrder(req: AuthRequest, res: Response) {
    const result = await orderService.createOrder(req.user!.id, req.body);
    sendCreated(res, result, 'Order created successfully');
  }

  async verifyPayment(req: AuthRequest, res: Response) {
    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
    await orderService.verifyPayment(orderId, razorpayPaymentId, razorpaySignature, req.user!.id);
    sendSuccess(res, null, 'Payment verified successfully');
  }

  async getUserOrders(req: AuthRequest, res: Response) {
    const { page, limit } = req.query;
    const result = await orderService.getUserOrders(
      req.user!.id,
      Number(page) || 1,
      Number(limit) || 10
    );
    sendSuccess(res, result);
  }

  async getOrder(req: AuthRequest, res: Response) {
    const order = await orderService.getOrderById(req.params.id, req.user!.id);
    sendSuccess(res, order);
  }

  async cancelOrder(req: AuthRequest, res: Response) {
    await orderService.cancelOrder(req.params.id, req.user!.id, req.body.reason);
    sendSuccess(res, null, 'Order cancelled');
  }

  async requestReturn(req: AuthRequest, res: Response) {
    const result = await orderService.requestReturn(
      req.params.id,
      req.user!.id,
      req.body.reason,
      req.body.description
    );
    sendCreated(res, result, 'Return request submitted');
  }

  // Admin
  async getAllOrders(req: Request, res: Response) {
    const result = await orderService.getAllOrders(req.query);
    res.json({ success: true, ...result });
  }

  async getOrderAdmin(req: Request, res: Response) {
    const order = await orderService.getOrderById(req.params.id);
    sendSuccess(res, order);
  }

  async updateStatus(req: AuthRequest, res: Response) {
    await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
      req.body.message,
      req.user!.id
    );
    sendSuccess(res, null, 'Order status updated');
  }
}

export const orderController = new OrderController();
