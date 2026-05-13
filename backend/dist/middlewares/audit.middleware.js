"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLog = auditLog;
const database_1 = require("../configs/database");
const logger_1 = require("../configs/logger");
function auditLog(options) {
    return async (req, res, next) => {
        const originalJson = res.json.bind(res);
        res.json = function (data) {
            if (res.statusCode < 400) {
                setImmediate(async () => {
                    try {
                        await database_1.prisma.auditLog.create({
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
                    }
                    catch (err) {
                        logger_1.logger.error('Audit log failed', err);
                    }
                });
            }
            return originalJson(data);
        };
        next();
    };
}
//# sourceMappingURL=audit.middleware.js.map