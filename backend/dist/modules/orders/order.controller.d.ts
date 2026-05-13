import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
export declare class OrderController {
    createOrder(req: AuthRequest, res: Response): Promise<void>;
    verifyPayment(req: AuthRequest, res: Response): Promise<void>;
    getUserOrders(req: AuthRequest, res: Response): Promise<void>;
    getOrder(req: AuthRequest, res: Response): Promise<void>;
    cancelOrder(req: AuthRequest, res: Response): Promise<void>;
    requestReturn(req: AuthRequest, res: Response): Promise<void>;
    getAllOrders(req: Request, res: Response): Promise<void>;
    getOrderAdmin(req: Request, res: Response): Promise<void>;
    updateStatus(req: AuthRequest, res: Response): Promise<void>;
}
export declare const orderController: OrderController;
//# sourceMappingURL=order.controller.d.ts.map