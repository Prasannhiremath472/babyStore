import { Request, Response, NextFunction } from 'express';
import { logger } from '../configs/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'http';

    logger.log(level, `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      userId: (req as any).user?.id,
    });
  });

  next();
}
