import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: UserRole;
        firstName: string;
        lastName: string;
    };
}
export declare function authenticate(req: AuthRequest, _res: Response, next: NextFunction): void;
export declare function optionalAuthenticate(req: AuthRequest, _res: Response, next: NextFunction): void;
export declare function authorize(...roles: UserRole[]): (req: AuthRequest, _res: Response, next: NextFunction) => void;
export declare function isSuperAdmin(req: AuthRequest, _res: Response, next: NextFunction): void;
export declare function isAdmin(req: AuthRequest, _res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.middleware.d.ts.map