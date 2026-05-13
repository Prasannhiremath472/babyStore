import { Router } from 'express';
import { orderController } from './order.controller';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';

const router = Router();

// Customer routes
router.post('/', authenticate, orderController.createOrder.bind(orderController));
router.post('/verify-payment', authenticate, orderController.verifyPayment.bind(orderController));
router.get('/my-orders', authenticate, orderController.getUserOrders.bind(orderController));
router.get('/my-orders/:id', authenticate, orderController.getOrder.bind(orderController));
router.patch('/my-orders/:id/cancel', authenticate, orderController.cancelOrder.bind(orderController));
router.post('/my-orders/:id/return', authenticate, orderController.requestReturn.bind(orderController));

// Admin routes
router.get('/admin/all', authenticate, isAdmin, orderController.getAllOrders.bind(orderController));
router.get('/admin/:id', authenticate, isAdmin, orderController.getOrderAdmin.bind(orderController));
router.patch('/admin/:id/status', authenticate, isAdmin, orderController.updateStatus.bind(orderController));

export default router;
