import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
export declare class CartController {
    getCart(req: AuthRequest, res: Response): Promise<void>;
    addItem(req: AuthRequest, res: Response): Promise<void>;
    updateItem(req: AuthRequest, res: Response): Promise<void>;
    removeItem(req: AuthRequest, res: Response): Promise<void>;
    clearCart(req: AuthRequest, res: Response): Promise<void>;
}
export declare const cartController: CartController;
//# sourceMappingURL=cart.controller.d.ts.map