"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const response_util_1 = require("../../utils/response.util");
const auth_validation_1 = require("./auth.validation");
class AuthController {
    async register(req, res) {
        const dto = auth_validation_1.registerSchema.parse(req.body);
        const { user, emailVerifyToken } = await auth_service_1.authService.register(dto, req.ip);
        (0, response_util_1.sendCreated)(res, { user }, 'Registration successful. Please verify your email.');
    }
    async login(req, res) {
        const dto = auth_validation_1.loginSchema.parse(req.body);
        const result = await auth_service_1.authService.login(dto, req.ip, req.headers['user-agent']);
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/api/v1/auth',
        });
        (0, response_util_1.sendSuccess)(res, {
            user: result.user,
            accessToken: result.accessToken,
        }, 'Login successful');
    }
    async refreshToken(req, res) {
        const token = req.cookies?.refreshToken || req.body.refreshToken;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Refresh token required' });
        }
        const tokens = await auth_service_1.authService.refreshTokens(token, req.ip);
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/api/v1/auth',
        });
        (0, response_util_1.sendSuccess)(res, { accessToken: tokens.accessToken }, 'Token refreshed');
    }
    async logout(req, res) {
        const token = req.cookies?.refreshToken || req.body.refreshToken;
        if (token && req.user?.id) {
            await auth_service_1.authService.logout(token, req.user.id);
        }
        res.clearCookie('refreshToken', { path: '/api/v1/auth' });
        (0, response_util_1.sendSuccess)(res, null, 'Logged out successfully');
    }
    async verifyEmail(req, res) {
        const { token } = req.params;
        await auth_service_1.authService.verifyEmail(token);
        (0, response_util_1.sendSuccess)(res, null, 'Email verified successfully');
    }
    async forgotPassword(req, res) {
        const { email } = req.body;
        await auth_service_1.authService.forgotPassword(email);
        (0, response_util_1.sendSuccess)(res, null, 'If the email exists, a reset link has been sent');
    }
    async resetPassword(req, res) {
        const dto = auth_validation_1.resetPasswordSchema.parse(req.body);
        await auth_service_1.authService.resetPassword(dto.token, dto.password);
        (0, response_util_1.sendSuccess)(res, null, 'Password reset successfully');
    }
    async changePassword(req, res) {
        const dto = auth_validation_1.changePasswordSchema.parse(req.body);
        await auth_service_1.authService.changePassword(req.user.id, dto.currentPassword, dto.newPassword);
        (0, response_util_1.sendSuccess)(res, null, 'Password changed successfully');
    }
    async me(req, res) {
        (0, response_util_1.sendSuccess)(res, { user: req.user });
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map