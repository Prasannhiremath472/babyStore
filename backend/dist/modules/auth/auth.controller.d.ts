import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
export declare class AuthController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    logout(req: AuthRequest, res: Response): Promise<void>;
    verifyEmail(req: Request, res: Response): Promise<void>;
    forgotPassword(req: Request, res: Response): Promise<void>;
    resetPassword(req: Request, res: Response): Promise<void>;
    changePassword(req: AuthRequest, res: Response): Promise<void>;
    me(req: AuthRequest, res: Response): Promise<void>;
}
export declare const authController: AuthController;
//# sourceMappingURL=auth.controller.d.ts.map