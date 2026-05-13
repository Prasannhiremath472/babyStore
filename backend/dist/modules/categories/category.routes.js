"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../../configs/database");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_util_1 = require("../../utils/response.util");
const redis_1 = require("../../configs/redis");
const slugify_1 = __importDefault(require("slugify"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const cached = await redis_1.cache.get('categories:all');
    if (cached)
        return (0, response_util_1.sendSuccess)(res, cached);
    const categories = await database_1.prisma.category.findMany({
        where: { isActive: true, deletedAt: null },
        include: {
            children: {
                where: { isActive: true, deletedAt: null },
                orderBy: { sortOrder: 'asc' },
            },
            _count: { select: { products: true } },
        },
        orderBy: { sortOrder: 'asc' },
    });
    const tree = categories.filter(c => !c.parentId);
    await redis_1.cache.set('categories:all', tree, 3600);
    (0, response_util_1.sendSuccess)(res, tree);
});
router.get('/tree', async (_req, res) => {
    const categories = await database_1.prisma.category.findMany({
        where: { isActive: true, deletedAt: null, parentId: null },
        include: {
            children: {
                where: { isActive: true },
                include: { children: { where: { isActive: true } } },
                orderBy: { sortOrder: 'asc' },
            },
        },
        orderBy: { sortOrder: 'asc' },
    });
    (0, response_util_1.sendSuccess)(res, categories);
});
router.get('/:slug', async (req, res) => {
    const category = await database_1.prisma.category.findUnique({
        where: { slug: req.params.slug, deletedAt: null },
        include: { children: { where: { isActive: true } } },
    });
    (0, response_util_1.sendSuccess)(res, category);
});
router.post('/', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const slug = (0, slugify_1.default)(req.body.name, { lower: true, strict: true });
    const category = await database_1.prisma.category.create({
        data: { ...req.body, slug },
    });
    await redis_1.cache.del('categories:all');
    (0, response_util_1.sendCreated)(res, category, 'Category created');
});
router.put('/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const category = await database_1.prisma.category.update({
        where: { id: req.params.id },
        data: req.body,
    });
    await redis_1.cache.del('categories:all');
    (0, response_util_1.sendSuccess)(res, category, 'Category updated');
});
router.delete('/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    await database_1.prisma.category.update({
        where: { id: req.params.id },
        data: { deletedAt: new Date(), isActive: false },
    });
    await redis_1.cache.del('categories:all');
    (0, response_util_1.sendSuccess)(res, null, 'Category deleted');
});
exports.default = router;
//# sourceMappingURL=category.routes.js.map