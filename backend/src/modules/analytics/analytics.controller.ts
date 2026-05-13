import { Request, Response } from 'express';
import { analyticsService } from './analytics.service';
import { sendSuccess } from '../../utils/response.util';

export class AnalyticsController {
  async getDashboard(_req: Request, res: Response) {
    const stats = await analyticsService.getDashboardStats();
    sendSuccess(res, stats);
  }

  async getRevenueReport(req: Request, res: Response) {
    const from = req.query.from ? new Date(req.query.from as string) : new Date(Date.now() - 30 * 86400000);
    const to = req.query.to ? new Date(req.query.to as string) : new Date();
    const groupBy = (req.query.groupBy as 'day' | 'week' | 'month') || 'day';
    const data = await analyticsService.getRevenueReport(from, to, groupBy);
    sendSuccess(res, data);
  }

  async getInventoryReport(_req: Request, res: Response) {
    const data = await analyticsService.getInventoryReport();
    sendSuccess(res, data);
  }

  async getCustomerReport(req: Request, res: Response) {
    const from = req.query.from ? new Date(req.query.from as string) : new Date(Date.now() - 30 * 86400000);
    const to = req.query.to ? new Date(req.query.to as string) : new Date();
    const data = await analyticsService.getCustomerReport(from, to);
    sendSuccess(res, data);
  }
}

export const analyticsController = new AnalyticsController();
