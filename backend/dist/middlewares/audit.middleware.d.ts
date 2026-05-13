import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AuditAction } from '@prisma/client';
interface AuditOptions {
    action: AuditAction;
    resource: string;
    getResourceId?: (req: AuthRequest) => string | undefined;
    getDescription?: (req: AuthRequest) => string;
}
export declare function auditLog(options: AuditOptions): (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=audit.middleware.d.ts.map