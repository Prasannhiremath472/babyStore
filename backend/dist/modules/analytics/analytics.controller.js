"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsController = exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
const response_util_1 = require("../../utils/response.util");
class AnalyticsController {
    async getDashboard(_req, res) {
        const stats = await analytics_service_1.analyticsService.getDashboardStats();
        (0, response_util_1.sendSuccess)(res, stats);
    }
    async getRevenueReport(req, res) {
        const from = req.query.from ? new Date(req.query.from) : new Date(Date.now() - 30 * 86400000);
        const to = req.query.to ? new Date(req.query.to) : new Date();
        const groupBy = req.query.groupBy || 'day';
        const data = await analytics_service_1.analyticsService.getRevenueReport(from, to, groupBy);
        (0, response_util_1.sendSuccess)(res, data);
    }
    async getInventoryReport(_req, res) {
        const data = await analytics_service_1.analyticsService.getInventoryReport();
        (0, response_util_1.sendSuccess)(res, data);
    }
    async getCustomerReport(req, res) {
        const from = req.query.from ? new Date(req.query.from) : new Date(Date.now() - 30 * 86400000);
        const to = req.query.to ? new Date(req.query.to) : new Date();
        const data = await analytics_service_1.analyticsService.getCustomerReport(from, to);
        (0, response_util_1.sendSuccess)(res, data);
    }
}
exports.AnalyticsController = AnalyticsController;
exports.analyticsController = new AnalyticsController();
//# sourceMappingURL=analytics.controller.js.map