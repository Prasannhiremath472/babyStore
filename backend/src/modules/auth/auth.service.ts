import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../../configs/database';
import { cache } from '../../configs/redis';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.util';
import {
  AppError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../middlewares/error.middleware';
import { UserRole, UserStatus } from '@prisma/client';
import { logger } from '../../configs/logger';

interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface LoginDto {
  email: string;
  password: string;
}

const SALT_ROUNDS = 12;
const REFRESH_TOKEN_TTL_DAYS = 7;

export class AuthService {
  async register(dto: RegisterDto, ipAddress?: string) {
    const existing = await prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (existing) throw new ConflictError('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const emailVerifyToken = crypto.randomBytes(32).toString('hex');
    const referralCode = this.generateReferralCode(dto.firstName);

    const user = await prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: UserRole.CUSTOMER,
        status: UserStatus.PENDING_VERIFICATION,
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

    await prisma.auditLog.create({
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

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      select: {
        id: true, email: true, passwordHash: true, firstName: true, lastName: true,
        role: true, status: true, emailVerified: true,
      },
    });

    if (!user) {
      await this.logFailedLogin(dto.email, ipAddress);
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.status === UserStatus.BANNED) {
      throw new UnauthorizedError('Account has been suspended');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValidPassword) {
      await this.logFailedLogin(dto.email, ipAddress, user.id);
      throw new UnauthorizedError('Invalid email or password');
    }

    const { passwordHash: _, ...safeUser } = user;
    const accessToken = signAccessToken(safeUser);
    const refreshToken = signRefreshToken({ id: user.id });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 86400000),
        ipAddress,
        userAgent,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), lastLoginIp: ipAddress },
    });

    await prisma.auditLog.create({
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

  async refreshTokens(token: string, ipAddress?: string) {
    let payload: { id: string };
    try {
      payload = verifyRefreshToken(token);
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedError('Refresh token expired or revoked');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true, email: true, firstName: true,
        lastName: true, role: true, status: true,
      },
    });
    if (!user || user.status === UserStatus.BANNED) {
      throw new UnauthorizedError('User not found or banned');
    }

    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    const newAccessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken({ id: user.id });

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 86400000),
        ipAddress,
      },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string, userId: string) {
    await prisma.refreshToken.updateMany({
      where: { token: refreshToken, userId },
      data: { revokedAt: new Date() },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'LOGOUT',
        resource: 'Auth',
        description: 'User logged out',
      },
    });
  }

  async verifyEmail(token: string) {
    const user = await prisma.user.findFirst({ where: { emailVerifyToken: token } });
    if (!user) throw new AppError('Invalid or expired verification token', 400);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        status: UserStatus.ACTIVE,
        emailVerifyToken: null,
      },
    });

    return true;
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return; // Silent — don't leak email existence

    const token = crypto.randomBytes(32).toString('hex');
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetExpiry: new Date(Date.now() + 3600000),
      },
    });

    return { token, email: user.email, firstName: user.firstName };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpiry: { gt: new Date() },
      },
    });
    if (!user) throw new AppError('Invalid or expired reset token', 400);

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });

    await prisma.refreshToken.updateMany({
      where: { userId: user.id },
      data: { revokedAt: new Date() },
    });
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User');

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) throw new UnauthorizedError('Current password is incorrect');

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });

    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { revokedAt: new Date() },
    });
  }

  private async logFailedLogin(email: string, ipAddress?: string, userId?: string) {
    await prisma.auditLog.create({
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

  private generateReferralCode(firstName: string): string {
    const suffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `${firstName.substring(0, 3).toUpperCase()}${suffix}`;
  }
}

export const authService = new AuthService();
