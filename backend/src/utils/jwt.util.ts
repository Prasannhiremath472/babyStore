import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '15m',
    issuer: 'littlenest.in',
    audience: 'littlenest-client',
  });
}

export function signRefreshToken(payload: { id: string }): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN as any) || '7d',
    issuer: 'littlenest.in',
  });
}

export function verifyRefreshToken(token: string): { id: string } {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string };
}
