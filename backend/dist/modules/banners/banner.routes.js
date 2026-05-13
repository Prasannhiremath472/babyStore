"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../../configs/database");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_util_1 = require("../../utils/response.util");
const redis_1 = require("../../configs/redis");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const type = req.query.type;
    const cacheKey = `banners:${type || 'all'}`;
    const cached = await redis_1.cache.get(cacheKey);
    if (cached)
        return (0, response_util_1.sendSuccess)(res, cached);
    const now = new Date();
    const where = {
        isActive: true,
        OR: [
            { startDate: null },
            { startDate: { lte: now } },
        ],
        AND: [
            { OR: [{ endDate: null }, { endDate: { gte: now } }] },
        ],
    };
    if (type)
        where.type = type.toUpperCase();
    const banners = await database_1.prisma.banner.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
    });
    await redis_1.cache.set(cacheKey, banners, 300);
    (0, response_util_1.sendSuccess)(res, banners);
});
router.get('/admin', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (_req, res) => {
    const banners = await database_1.prisma.banner.findMany({ orderBy: { sortOrder: 'asc' } });
    (0, response_util_1.sendSuccess)(res, banners);
});
router.post('/admin', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const banner = await database_1.prisma.banner.create({ data: req.body });
    await redis_1.cache.delPattern('banners:*');
    (0, response_util_1.sendCreated)(res, banner);
});
router.put('/admin/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const banner = await database_1.prisma.banner.update({ where: { id: req.params.id }, data: req.body });
    await redis_1.cache.delPattern('banners:*');
    (0, response_util_1.sendSuccess)(res, banner, 'Banner updated');
});
router.delete('/admin/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    await database_1.prisma.banner.delete({ where: { id: req.params.id } });
    await redis_1.cache.delPattern('banners:*');
    (0, response_util_1.sendSuccess)(res, null, 'Banner deleted');
});
exports.default = router;
//# sourceMappingURL=banner.routes.js.map