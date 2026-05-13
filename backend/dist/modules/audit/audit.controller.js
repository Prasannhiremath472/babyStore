"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditController = exports.AuditController = void 0;
const database_1 = require("../../configs/database");
const response_util_1 = require("../../utils/response.util");
const response_util_2 = require("../../utils/response.util");
class AuditController {
    async getLogs(req, res) {
        const { page, limit, skip } = (0, response_util_2.getPaginationParams)(req.query);
        const where = {};
        if (req.query.userId)
            where.userId = req.query.userId;
        if (req.query.action)
            where.action = req.query.action;
        if (req.query.resource)
            where.resource = req.query.resource;
        if (req.query.from)
            where.createdAt = { gte: new Date(req.query.from) };
        if (req.query.to)
            where.createdAt = { ...where.createdAt, lte: new Date(req.query.to) };
        const [total, logs] = await Promise.all([
            database_1.prisma.auditLog.count({ where }),
            database_1.prisma.auditLog.findMany({
                where,
                include: {
                    user: { select: { firstName: true, lastName: true, email: true, role: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
        ]);
        res.json({ success: true, data: logs, meta: (0, response_util_2.paginate)(page, limit, total) });
    }
    async getLogById(req, res) {
        const log = await database_1.prisma.auditLog.findUnique({
            where: { id: req.params.id },
            include: {
                user: { select: { firstName: true, lastName: true, email: true } },
            },
        });
        (0, response_util_1.sendSuccess)(res, log);
    }
}
exports.AuditController = AuditController;
exports.auditController = new AuditController();
//# sourceMappingURL=audit.controller.js.map