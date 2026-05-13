import { Router } from 'express';
import { analyticsController } from './analytics.controller';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate, isAdmin);
router.get('/dashboard', analyticsController.getDashboard.bind(analyticsController));
router.get('/revenue', analyticsController.getRevenueReport.bind(analyticsController));
router.get('/inventory', analyticsController.getInventoryReport.bind(analyticsController));
router.get('/customers', analyticsController.getCustomerReport.bind(analyticsController));

export default router;
