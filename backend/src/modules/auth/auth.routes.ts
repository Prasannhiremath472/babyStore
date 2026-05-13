import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register new customer
 */
router.post('/register', authController.register.bind(authController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 */
router.post('/login', authController.login.bind(authController));

router.post('/refresh', authController.refreshToken.bind(authController));
router.post('/logout', authenticate, authController.logout.bind(authController));
router.get('/verify-email/:token', authController.verifyEmail.bind(authController));
router.post('/forgot-password', authController.forgotPassword.bind(authController));
router.post('/reset-password', authController.resetPassword.bind(authController));
router.put('/change-password', authenticate, authController.changePassword.bind(authController));
router.get('/me', authenticate, authController.me.bind(authController));

export default router;
