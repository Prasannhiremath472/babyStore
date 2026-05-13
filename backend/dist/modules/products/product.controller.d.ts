import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
export declare class ProductController {
    create(req: AuthRequest, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    getBySlug(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    update(req: AuthRequest, res: Response): Promise<void>;
    approve(req: AuthRequest, res: Response): Promise<void>;
    delete(req: AuthRequest, res: Response): Promise<void>;
    getFeatured(req: Request, res: Response): Promise<void>;
    getBestsellers(req: Request, res: Response): Promise<void>;
    getRelated(req: Request, res: Response): Promise<void>;
    updateInventory(req: AuthRequest, res: Response): Promise<void>;
}
export declare const productController: ProductController;
//# sourceMappingURL=product.controller.d.ts.map