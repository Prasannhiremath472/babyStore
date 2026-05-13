import { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccess, sendCreated } from '../../utils/response.util';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { registerSchema, loginSchema, resetPasswordSchema, changePasswordSchema } from './auth.validation';

export class AuthController {
  async register(req: Request, res: Response) {
    const dto = registerSchema.parse(req.body);
    const { user, emailVerifyToken } = await authService.register(dto, req.ip);
    sendCreated(res, { user }, 'Registration successful. Please verify your email.');
  }

  async login(req: Request, res: Response) {
    const dto = loginSchema.parse(req.body);
    const result = await authService.login(dto, req.ip, req.headers['user-agent']);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth',
    });

    sendSuccess(res, {
      user: result.user,
      accessToken: result.accessToken,
    }, 'Login successful');
  }

  async refreshToken(req: Request, res: Response) {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Refresh token required' });
    }
    const tokens = await authService.refreshTokens(token, req.ip);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth',
    });
    sendSuccess(res, { accessToken: tokens.accessToken }, 'Token refreshed');
  }

  async logout(req: AuthRequest, res: Response) {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (token && req.user?.id) {
      await authService.logout(token, req.user.id);
    }
    res.clearCookie('refreshToken', { path: '/api/v1/auth' });
    sendSuccess(res, null, 'Logged out successfully');
  }

  async verifyEmail(req: Request, res: Response) {
    const { token } = req.params;
    await authService.verifyEmail(token);
    sendSuccess(res, null, 'Email verified successfully');
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    await authService.forgotPassword(email);
    sendSuccess(res, null, 'If the email exists, a reset link has been sent');
  }

  async resetPassword(req: Request, res: Response) {
    const dto = resetPasswordSchema.parse(req.body);
    await authService.resetPassword(dto.token, dto.password);
    sendSuccess(res, null, 'Password reset successfully');
  }

  async changePassword(req: AuthRequest, res: Response) {
    const dto = changePasswordSchema.parse(req.body);
    await authService.changePassword(req.user!.id, dto.currentPassword, dto.newPassword);
    sendSuccess(res, null, 'Password changed successfully');
  }

  async me(req: AuthRequest, res: Response) {
    sendSuccess(res, { user: req.user });
  }
}

export const authController = new AuthController();
