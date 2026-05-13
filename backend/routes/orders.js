const router = require('express').Router();
const ctrl   = require('../controllers/orderController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.post('/',                    authenticate, ctrl.create);
router.post('/verify-payment',      authenticate, ctrl.verifyPayment);
router.get('/my-orders',            authenticate, ctrl.myOrders);
router.get('/my-orders/:id',        authenticate, ctrl.myOrderDetail);
router.get('/admin/all',            authenticate, isAdmin, ctrl.adminAll);
router.patch('/admin/:id/status',   authenticate, isAdmin, ctrl.updateStatus);

module.exports = router;
