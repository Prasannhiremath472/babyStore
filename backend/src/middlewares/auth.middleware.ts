import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../configs/database';
import { UnauthorizedError, ForbiddenError } from './error.middleware';
import { UserRole } from '@prisma/client';
import { cache } from '../configs/redis';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  };
}

export function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = payload;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Token expired');
    }
    throw new UnauthorizedError('Invalid token');
  }
}

export function optionalAuthenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = payload;
  } catch {}
  next();
}

export function authorize(...roles: UserRole[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) throw new UnauthorizedError();
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError(`Access denied. Required roles: ${roles.join(', ')}`);
    }
    next();
  };
}

export function isSuperAdmin(req: AuthRequest, _res: Response, next: NextFunction) {
  if (req.user?.role !== UserRole.SUPER_ADMIN) {
    throw new ForbiddenError('Super admin access required');
  }
  next();
}

export function isAdmin(req: AuthRequest, _res: Response, next: NextFunction) {
  const adminRoles: UserRole[] = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER];
  if (!req.user || !adminRoles.includes(req.user.role)) {
    throw new ForbiddenError('Admin access required');
  }
  next();
}
