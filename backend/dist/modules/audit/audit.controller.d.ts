import { Request, Response } from 'express';
export declare class AuditController {
    getLogs(req: Request, res: Response): Promise<void>;
    getLogById(req: Request, res: Response): Promise<void>;
}
export declare const auditController: AuditController;
//# sourceMappingURL=audit.controller.d.ts.map