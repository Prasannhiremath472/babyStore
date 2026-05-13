"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const logger_1 = require("../configs/logger");
function requestLogger(req, res, next) {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'http';
        logger_1.logger.log(level, `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            userId: req.user?.id,
        });
    });
    next();
}
//# sourceMappingURL=requestLogger.middleware.js.map