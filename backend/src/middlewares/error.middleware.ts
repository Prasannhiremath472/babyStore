import { Request, Response, NextFunction } from 'express';
import { logger } from '../configs/logger';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(message: string, statusCode = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public errors: Record<string, string>;
  constructor(errors: Record<string, string>) {
    super('Validation failed', 422, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = 500;
  let message = 'Internal server error';
  let code = 'INTERNAL_ERROR';
  let errors: Record<string, string> | undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code || 'APP_ERROR';
    if (err instanceof ValidationError) errors = err.errors;
  } else if (err instanceof ZodError) {
    statusCode = 422;
    code = 'VALIDATION_ERROR';
    message = 'Validation failed';
    errors = err.errors.reduce((acc, e) => {
      acc[e.path.join('.')] = e.message;
      return acc;
    }, {} as Record<string, string>);
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'Duplicate entry — resource already exists';
      code = 'CONFLICT';
    } else if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Record not found';
      code = 'NOT_FOUND';
    } else if (err.code === 'P2003') {
      statusCode = 400;
      message = 'Related record not found';
      code = 'RELATION_ERROR';
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Invalid data provided';
    code = 'PRISMA_VALIDATION';
  }

  if (statusCode >= 500) {
    logger.error(`[${req.method}] ${req.path}`, {
      error: err.message,
      stack: err.stack,
      userId: (req as any).user?.id,
      ip: req.ip,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    code,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
