"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("./analytics.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate, auth_middleware_1.isAdmin);
router.get('/dashboard', analytics_controller_1.analyticsController.getDashboard.bind(analytics_controller_1.analyticsController));
router.get('/revenue', analytics_controller_1.analyticsController.getRevenueReport.bind(analytics_controller_1.analyticsController));
router.get('/inventory', analytics_controller_1.analyticsController.getInventoryReport.bind(analytics_controller_1.analyticsController));
router.get('/customers', analytics_controller_1.analyticsController.getCustomerReport.bind(analytics_controller_1.analyticsController));
exports.default = router;
//# sourceMappingURL=analytics.routes.js.map