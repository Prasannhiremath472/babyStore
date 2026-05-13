"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../../configs/database");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_util_1 = require("../../utils/response.util");
const error_middleware_1 = require("../../middlewares/error.middleware");
const router = (0, express_1.Router)();
router.get('/product/:productId', async (req, res) => {
    const { page, limit, skip } = (0, response_util_1.getPaginationParams)(req.query);
    const [total, reviews] = await Promise.all([
        database_1.prisma.review.count({ where: { productId: req.params.productId, status: 'APPROVED' } }),
        database_1.prisma.review.findMany({
            where: { productId: req.params.productId, status: 'APPROVED' },
            include: {
                user: { select: { firstName: true, lastName: true, avatar: true } },
            },
            orderBy: { createdAt: 'desc' },
            skip, take: limit,
        }),
    ]);
    res.json({ success: true, data: reviews, meta: (0, response_util_1.paginate)(page, limit, total) });
});
router.post('/', auth_middleware_1.authenticate, async (req, res) => {
    const existing = await database_1.prisma.review.findUnique({
        where: { productId_userId: { productId: req.body.productId, userId: req.user.id } },
    });
    if (existing)
        throw new error_middleware_1.AppError('You have already reviewed this product', 400);
    const verifiedPurchase = await database_1.prisma.orderItem.findFirst({
        where: { productId: req.body.productId, order: { userId: req.user.id, status: 'DELIVERED' } },
    });
    const review = await database_1.prisma.review.create({
        data: {
            ...req.body,
            userId: req.user.id,
            isVerifiedPurchase: !!verifiedPurchase,
            status: 'PENDING',
        },
    });
    (0, response_util_1.sendCreated)(res, review, 'Review submitted for approval');
});
router.patch('/admin/:id/approve', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const review = await database_1.prisma.review.update({
        where: { id: req.params.id },
        data: { status: 'APPROVED' },
    });
    (0, response_util_1.sendSuccess)(res, review, 'Review approved');
});
router.patch('/admin/:id/reject', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const review = await database_1.prisma.review.update({
        where: { id: req.params.id },
        data: { status: 'REJECTED' },
    });
    (0, response_util_1.sendSuccess)(res, review, 'Review rejected');
});
router.get('/admin/pending', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const { page, limit, skip } = (0, response_util_1.getPaginationParams)(req.query);
    const [total, reviews] = await Promise.all([
        database_1.prisma.review.count({ where: { status: 'PENDING' } }),
        database_1.prisma.review.findMany({
            where: { status: 'PENDING' },
            include: {
                user: { select: { firstName: true, lastName: true, email: true } },
                product: { select: { name: true, images: { where: { isPrimary: true }, take: 1 } } },
            },
            orderBy: { createdAt: 'desc' },
            skip, take: limit,
        }),
    ]);
    res.json({ success: true, data: reviews, meta: (0, response_util_1.paginate)(page, limit, total) });
});
exports.default = router;
//# sourceMappingURL=review.routes.js.map