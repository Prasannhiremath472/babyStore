import { Request, Response } from 'express';
export declare class AnalyticsController {
    getDashboard(_req: Request, res: Response): Promise<void>;
    getRevenueReport(req: Request, res: Response): Promise<void>;
    getInventoryReport(_req: Request, res: Response): Promise<void>;
    getCustomerReport(req: Request, res: Response): Promise<void>;
}
export declare const analyticsController: AnalyticsController;
//# sourceMappingURL=analytics.controller.d.ts.map