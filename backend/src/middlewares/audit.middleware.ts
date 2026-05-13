import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { prisma } from '../configs/database';
import { AuditAction } from '@prisma/client';
import { logger } from '../configs/logger';

interface AuditOptions {
  action: AuditAction;
  resource: string;
  getResourceId?: (req: AuthRequest) => string | undefined;
  getDescription?: (req: AuthRequest) => string;
}

export function auditLog(options: AuditOptions) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);

    res.json = function (data: any) {
      if (res.statusCode < 400) {
        setImmediate(async () => {
          try {
            await prisma.auditLog.create({
              data: {
                userId: req.user?.id,
                action: options.action,
                resource: options.resource,
                resourceId: options.getResourceId?.(req),
                description: options.getDescription?.(req) ||
                  `${options.action} on ${options.resource}`,
                ipAddress: req.ip || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                newData: ['CREATE', 'UPDATE'].includes(options.action) ? data?.data : undefined,
              },
            });
          } catch (err) {
            logger.error('Audit log failed', err);
          }
        });
      }
      return originalJson(data);
    };

    next();
  };
}
