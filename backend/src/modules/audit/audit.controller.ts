import { Request, Response } from 'express';
import { prisma } from '../../configs/database';
import { sendSuccess } from '../../utils/response.util';
import { getPaginationParams, paginate } from '../../utils/response.util';

export class AuditController {
  async getLogs(req: Request, res: Response) {
    const { page, limit, skip } = getPaginationParams(req.query);

    const where: any = {};
    if (req.query.userId) where.userId = req.query.userId;
    if (req.query.action) where.action = req.query.action;
    if (req.query.resource) where.resource = req.query.resource;
    if (req.query.from) where.createdAt = { gte: new Date(req.query.from as string) };
    if (req.query.to) where.createdAt = { ...where.createdAt, lte: new Date(req.query.to as string) };

    const [total, logs] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.findMany({
        where,
        include: {
          user: { select: { firstName: true, lastName: true, email: true, role: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    res.json({ success: true, data: logs, meta: paginate(page, limit, total) });
  }

  async getLogById(req: Request, res: Response) {
    const log = await prisma.auditLog.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
    });
    sendSuccess(res, log);
  }
}

export const auditController = new AuditController();
