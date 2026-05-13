"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../../configs/database");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_util_1 = require("../../utils/response.util");
const slugify_1 = __importDefault(require("slugify"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const brands = await database_1.prisma.brand.findMany({
        where: { isActive: true, deletedAt: null },
        select: {
            id: true, name: true, slug: true, logo: true, isFeatured: true,
            _count: { select: { products: true } },
        },
        orderBy: { name: 'asc' },
    });
    (0, response_util_1.sendSuccess)(res, brands);
});
router.get('/featured', async (_req, res) => {
    const brands = await database_1.prisma.brand.findMany({
        where: { isFeatured: true, isActive: true, deletedAt: null },
        orderBy: { sortOrder: 'asc' },
    });
    (0, response_util_1.sendSuccess)(res, brands);
});
router.post('/', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const slug = (0, slugify_1.default)(req.body.name, { lower: true, strict: true });
    const brand = await database_1.prisma.brand.create({ data: { ...req.body, slug } });
    (0, response_util_1.sendCreated)(res, brand);
});
router.put('/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const brand = await database_1.prisma.brand.update({ where: { id: req.params.id }, data: req.body });
    (0, response_util_1.sendSuccess)(res, brand, 'Brand updated');
});
router.delete('/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    await database_1.prisma.brand.update({
        where: { id: req.params.id },
        data: { deletedAt: new Date(), isActive: false },
    });
    (0, response_util_1.sendSuccess)(res, null, 'Brand deleted');
});
exports.default = router;
//# sourceMappingURL=brand.routes.js.map