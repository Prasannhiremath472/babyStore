"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../../configs/database");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const response_util_1 = require("../../utils/response.util");
const error_middleware_1 = require("../../middlewares/error.middleware");
const router = (0, express_1.Router)();
router.post('/validate', auth_middleware_1.authenticate, async (req, res) => {
    const { code, subtotal } = req.body;
    const coupon = await database_1.prisma.coupon.findUnique({
        where: { code: code.toUpperCase(), isActive: true },
    });
    if (!coupon)
        throw new error_middleware_1.AppError('Invalid coupon code', 400);
    if (new Date() > coupon.endDate)
        throw new error_middleware_1.AppError('Coupon has expired', 400);
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        throw new error_middleware_1.AppError('Coupon usage limit reached', 400);
    }
    if (coupon.minOrderAmount && subtotal < Number(coupon.minOrderAmount)) {
        throw new error_middleware_1.AppError(`Minimum order amount is ₹${coupon.minOrderAmount}`, 400);
    }
    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
        discount = (subtotal * Number(coupon.discountValue)) / 100;
        if (coupon.maxDiscountAmount)
            discount = Math.min(discount, Number(coupon.maxDiscountAmount));
    }
    else if (coupon.discountType === 'FLAT') {
        discount = Math.min(Number(coupon.discountValue), subtotal);
    }
    (0, response_util_1.sendSuccess)(res, { coupon, discount, finalAmount: subtotal - discount });
});
router.get('/admin', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const coupons = await database_1.prisma.coupon.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
    });
    (0, response_util_1.sendSuccess)(res, coupons);
});
router.post('/admin', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const coupon = await database_1.prisma.coupon.create({
        data: { ...req.body, code: req.body.code.toUpperCase() },
    });
    (0, response_util_1.sendCreated)(res, coupon);
});
router.put('/admin/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const coupon = await database_1.prisma.coupon.update({ where: { id: req.params.id }, data: req.body });
    (0, response_util_1.sendSuccess)(res, coupon, 'Coupon updated');
});
router.delete('/admin/:id', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    await database_1.prisma.coupon.update({
        where: { id: req.params.id },
        data: { deletedAt: new Date(), isActive: false },
    });
    (0, response_util_1.sendSuccess)(res, null, 'Coupon deleted');
});
exports.default = router;
//# sourceMappingURL=coupon.routes.js.map