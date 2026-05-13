const router = require('express').Router();
const ctrl   = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/dashboard', authenticate, isAdmin, ctrl.dashboard);
router.get('/analytics', authenticate, isAdmin, ctrl.analytics);

module.exports = router;
