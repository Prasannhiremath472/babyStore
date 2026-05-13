import { Router } from 'express';
import { prisma } from '../../configs/database';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.util';
import { AppError } from '../../middlewares/error.middleware';

const router = Router();

router.post('/validate', authenticate, async (req: any, res) => {
  const { code, subtotal } = req.body;
  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase(), isActive: true },
  });

  if (!coupon) throw new AppError('Invalid coupon code', 400);
  if (new Date() > coupon.endDate) throw new AppError('Coupon has expired', 400);
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new AppError('Coupon usage limit reached', 400);
  }
  if (coupon.minOrderAmount && subtotal < Number(coupon.minOrderAmount)) {
    throw new AppError(`Minimum order amount is ₹${coupon.minOrderAmount}`, 400);
  }

  let discount = 0;
  if (coupon.discountType === 'PERCENTAGE') {
    discount = (subtotal * Number(coupon.discountValue)) / 100;
    if (coupon.maxDiscountAmount) discount = Math.min(discount, Number(coupon.maxDiscountAmount));
  } else if (coupon.discountType === 'FLAT') {
    discount = Math.min(Number(coupon.discountValue), subtotal);
  }

  sendSuccess(res, { coupon, discount, finalAmount: subtotal - discount });
});

router.get('/admin', authenticate, isAdmin, async (req, res) => {
  const coupons = await prisma.coupon.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
  });
  sendSuccess(res, coupons);
});

router.post('/admin', authenticate, isAdmin, async (req: any, res) => {
  const coupon = await prisma.coupon.create({
    data: { ...req.body, code: req.body.code.toUpperCase() },
  });
  sendCreated(res, coupon);
});

router.put('/admin/:id', authenticate, isAdmin, async (req: any, res) => {
  const coupon = await prisma.coupon.update({ where: { id: req.params.id }, data: req.body });
  sendSuccess(res, coupon, 'Coupon updated');
});

router.delete('/admin/:id', authenticate, isAdmin, async (req: any, res) => {
  await prisma.coupon.update({
    where: { id: req.params.id },
    data: { deletedAt: new Date(), isActive: false },
  });
  sendSuccess(res, null, 'Coupon deleted');
});

export default router;
