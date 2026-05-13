"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.optionalAuthenticate = optionalAuthenticate;
exports.authorize = authorize;
exports.isSuperAdmin = isSuperAdmin;
exports.isAdmin = isAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("./error.middleware");
const client_1 = require("@prisma/client");
function authenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new error_middleware_1.UnauthorizedError('No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new error_middleware_1.UnauthorizedError('Token expired');
        }
        throw new error_middleware_1.UnauthorizedError('Invalid token');
    }
}
function optionalAuthenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
        return next();
    const token = authHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
    }
    catch { }
    next();
}
function authorize(...roles) {
    return (req, _res, next) => {
        if (!req.user)
            throw new error_middleware_1.UnauthorizedError();
        if (!roles.includes(req.user.role)) {
            throw new error_middleware_1.ForbiddenError(`Access denied. Required roles: ${roles.join(', ')}`);
        }
        next();
    };
}
function isSuperAdmin(req, _res, next) {
    if (req.user?.role !== client_1.UserRole.SUPER_ADMIN) {
        throw new error_middleware_1.ForbiddenError('Super admin access required');
    }
    next();
}
function isAdmin(req, _res, next) {
    const adminRoles = [client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.MANAGER];
    if (!req.user || !adminRoles.includes(req.user.role)) {
        throw new error_middleware_1.ForbiddenError('Admin access required');
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map