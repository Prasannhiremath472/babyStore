"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = exports.AppError = void 0;
exports.errorHandler = errorHandler;
const logger_1 = require("../configs/logger");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
class AppError extends Error {
    statusCode;
    isOperational;
    code;
    constructor(message, statusCode = 500, code) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    errors;
    constructor(errors) {
        super('Validation failed', 422, 'VALIDATION_ERROR');
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends AppError {
    constructor(message = 'Authentication required') {
        super(message, 401, 'UNAUTHORIZED');
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Insufficient permissions') {
        super(message, 403, 'FORBIDDEN');
    }
}
exports.ForbiddenError = ForbiddenError;
class ConflictError extends AppError {
    constructor(message) {
        super(message, 409, 'CONFLICT');
    }
}
exports.ConflictError = ConflictError;
function errorHandler(err, req, res, _next) {
    let statusCode = 500;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';
    let errors;
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        code = err.code || 'APP_ERROR';
        if (err instanceof ValidationError)
            errors = err.errors;
    }
    else if (err instanceof zod_1.ZodError) {
        statusCode = 422;
        code = 'VALIDATION_ERROR';
        message = 'Validation failed';
        errors = err.errors.reduce((acc, e) => {
            acc[e.path.join('.')] = e.message;
            return acc;
        }, {});
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            statusCode = 409;
            message = 'Duplicate entry — resource already exists';
            code = 'CONFLICT';
        }
        else if (err.code === 'P2025') {
            statusCode = 404;
            message = 'Record not found';
            code = 'NOT_FOUND';
        }
        else if (err.code === 'P2003') {
            statusCode = 400;
            message = 'Related record not found';
            code = 'RELATION_ERROR';
        }
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = 'Invalid data provided';
        code = 'PRISMA_VALIDATION';
    }
    if (statusCode >= 500) {
        logger_1.logger.error(`[${req.method}] ${req.path}`, {
            error: err.message,
            stack: err.stack,
            userId: req.user?.id,
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
//# sourceMappingURL=error.middleware.js.map