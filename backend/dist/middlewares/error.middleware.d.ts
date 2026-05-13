import { Request, Response, NextFunction } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    code?: string;
    constructor(message: string, statusCode?: number, code?: string);
}
export declare class ValidationError extends AppError {
    errors: Record<string, string>;
    constructor(errors: Record<string, string>);
}
export declare class NotFoundError extends AppError {
    constructor(resource?: string);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message: string);
}
export declare function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=error.middleware.d.ts.map