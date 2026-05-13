const router = require('express').Router();
const ctrl   = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/register',    ctrl.register);
router.post('/login',       ctrl.login);
router.post('/refresh',     ctrl.refresh);
router.post('/send-otp',    ctrl.sendOtp);
router.post('/verify-otp',  ctrl.verifyOtp);
router.get('/me',           authenticate, ctrl.me);

module.exports = router;
