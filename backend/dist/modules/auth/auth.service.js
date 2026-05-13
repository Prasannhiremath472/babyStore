"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../../configs/database");
const jwt_util_1 = require("../../utils/jwt.util");
const error_middleware_1 = require("../../middlewares/error.middleware");
const client_1 = require("@prisma/client");
const SALT_ROUNDS = 12;
const REFRESH_TOKEN_TTL_DAYS = 7;
class AuthService {
    async register(dto, ipAddress) {
        const existing = await database_1.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
        if (existing)
            throw new error_middleware_1.ConflictError('Email already registered');
        const passwordHash = await bcryptjs_1.default.hash(dto.password, SALT_ROUNDS);
        const emailVerifyToken = crypto_1.default.randomBytes(32).toString('hex');
        const referralCode = this.generateReferralCode(dto.firstName);
        const user = await database_1.prisma.user.create({
            data: {
                email: dto.email.toLowerCase(),
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                role: client_1.UserRole.CUSTOMER,
                status: client_1.UserStatus.PENDING_VERIFICATION,
                emailVerifyToken,
                referralCode,
                wallet: { create: { balance: 0 } },
                cart: { create: {} },
            },
            select: {
                id: true, email: true, firstName: true, lastName: true,
                role: true, status: true, createdAt: true,
            },
        });
        await database_1.prisma.auditLog.create({
            data: {
                userId: user.id,
                action: 'CREATE',
                resource: 'User',
                resourceId: user.id,
                description: 'User registered',
                ipAddress,
            },
        });
        return { user, emailVerifyToken };
    }
    async login(dto, ipAddress, userAgent) {
        const user = await database_1.prisma.user.findUnique({
            where: { email: dto.email.toLowerCase() },
            select: {
                id: true, email: true, passwordHash: true, firstName: true, lastName: true,
                role: true, status: true, emailVerified: true,
            },
        });
        if (!user) {
            await this.logFailedLogin(dto.email, ipAddress);
            throw new error_middleware_1.UnauthorizedError('Invalid email or password');
        }
        if (user.status === client_1.UserStatus.BANNED) {
            throw new error_middleware_1.UnauthorizedError('Account has been suspended');
        }
        const isValidPassword = await bcryptjs_1.default.compare(dto.password, user.passwordHash);
        if (!isValidPassword) {
            await this.logFailedLogin(dto.email, ipAddress, user.id);
            throw new error_middleware_1.UnauthorizedError('Invalid email or password');
        }
        const { passwordHash: _, ...safeUser } = user;
        const accessToken = (0, jwt_util_1.signAccessToken)(safeUser);
        const refreshToken = (0, jwt_util_1.signRefreshToken)({ id: user.id });
        await database_1.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 86400000),
                ipAddress,
                userAgent,
            },
        });
        await database_1.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date(), lastLoginIp: ipAddress },
        });
        await database_1.prisma.auditLog.create({
            data: {
                userId: user.id,
                action: 'LOGIN',
                resource: 'Auth',
                description: 'User logged in',
                ipAddress,
                userAgent,
            },
        });
        return { user: safeUser, accessToken, refreshToken };
    }
    async refreshTokens(token, ipAddress) {
        let payload;
        try {
            payload = (0, jwt_util_1.verifyRefreshToken)(token);
        }
        catch {
            throw new error_middleware_1.UnauthorizedError('Invalid refresh token');
        }
        const stored = await database_1.prisma.refreshToken.findUnique({ where: { token } });
        if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
            throw new error_middleware_1.UnauthorizedError('Refresh token expired or revoked');
        }
        const user = await database_1.prisma.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true, email: true, firstName: true,
                lastName: true, role: true, status: true,
            },
        });
        if (!user || user.status === client_1.UserStatus.BANNED) {
            throw new error_middleware_1.UnauthorizedError('User not found or banned');
        }
        await database_1.prisma.refreshToken.update({
            where: { id: stored.id },
            data: { revokedAt: new Date() },
        });
        const newAccessToken = (0, jwt_util_1.signAccessToken)(user);
        const newRefreshToken = (0, jwt_util_1.signRefreshToken)({ id: user.id });
        await database_1.prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 86400000),
                ipAddress,
            },
        });
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
    async logout(refreshToken, userId) {
        await database_1.prisma.refreshToken.updateMany({
            where: { token: refreshToken, userId },
            data: { revokedAt: new Date() },
        });
        await database_1.prisma.auditLog.create({
            data: {
                userId,
                action: 'LOGOUT',
                resource: 'Auth',
                description: 'User logged out',
            },
        });
    }
    async verifyEmail(token) {
        const user = await database_1.prisma.user.findFirst({ where: { emailVerifyToken: token } });
        if (!user)
            throw new error_middleware_1.AppError('Invalid or expired verification token', 400);
        await database_1.prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                status: client_1.UserStatus.ACTIVE,
                emailVerifyToken: null,
            },
        });
        return true;
    }
    async forgotPassword(email) {
        const user = await database_1.prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user)
            return;
        const token = crypto_1.default.randomBytes(32).toString('hex');
        await database_1.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: token,
                passwordResetExpiry: new Date(Date.now() + 3600000),
            },
        });
        return { token, email: user.email, firstName: user.firstName };
    }
    async resetPassword(token, newPassword) {
        const user = await database_1.prisma.user.findFirst({
            where: {
                passwordResetToken: token,
                passwordResetExpiry: { gt: new Date() },
            },
        });
        if (!user)
            throw new error_middleware_1.AppError('Invalid or expired reset token', 400);
        const passwordHash = await bcryptjs_1.default.hash(newPassword, SALT_ROUNDS);
        await database_1.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                passwordResetToken: null,
                passwordResetExpiry: null,
            },
        });
        await database_1.prisma.refreshToken.updateMany({
            where: { userId: user.id },
            data: { revokedAt: new Date() },
        });
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await database_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new error_middleware_1.NotFoundError('User');
        const isValid = await bcryptjs_1.default.compare(currentPassword, user.passwordHash);
        if (!isValid)
            throw new error_middleware_1.UnauthorizedError('Current password is incorrect');
        const passwordHash = await bcryptjs_1.default.hash(newPassword, SALT_ROUNDS);
        await database_1.prisma.user.update({ where: { id: userId }, data: { passwordHash } });
        await database_1.prisma.refreshToken.updateMany({
            where: { userId },
            data: { revokedAt: new Date() },
        });
    }
    async logFailedLogin(email, ipAddress, userId) {
        await database_1.prisma.auditLog.create({
            data: {
                userId,
                action: 'LOGIN_FAILED',
                resource: 'Auth',
                description: `Failed login attempt for ${email}`,
                ipAddress,
                metadata: { email },
            },
        });
    }
    generateReferralCode(firstName) {
        const suffix = crypto_1.default.randomBytes(3).toString('hex').toUpperCase();
        return `${firstName.substring(0, 3).toUpperCase()}${suffix}`;
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map