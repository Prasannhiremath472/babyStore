import { Router } from 'express';
import { prisma } from '../../configs/database';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';
import { sendSuccess, sendCreated, getPaginationParams, paginate } from '../../utils/response.util';
import { AppError } from '../../middlewares/error.middleware';

const router = Router();

router.get('/product/:productId', async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const [total, reviews] = await Promise.all([
    prisma.review.count({ where: { productId: req.params.productId, status: 'APPROVED' } }),
    prisma.review.findMany({
      where: { productId: req.params.productId, status: 'APPROVED' },
      include: {
        user: { select: { firstName: true, lastName: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip, take: limit,
    }),
  ]);
  res.json({ success: true, data: reviews, meta: paginate(page, limit, total) });
});

router.post('/', authenticate, async (req: any, res) => {
  const existing = await prisma.review.findUnique({
    where: { productId_userId: { productId: req.body.productId, userId: req.user.id } },
  });
  if (existing) throw new AppError('You have already reviewed this product', 400);

  const verifiedPurchase = await prisma.orderItem.findFirst({
    where: { productId: req.body.productId, order: { userId: req.user.id, status: 'DELIVERED' } },
  });

  const review = await prisma.review.create({
    data: {
      ...req.body,
      userId: req.user.id,
      isVerifiedPurchase: !!verifiedPurchase,
      status: 'PENDING',
    },
  });
  sendCreated(res, review, 'Review submitted for approval');
});

router.patch('/admin/:id/approve', authenticate, isAdmin, async (req: any, res) => {
  const review = await prisma.review.update({
    where: { id: req.params.id },
    data: { status: 'APPROVED' },
  });
  sendSuccess(res, review, 'Review approved');
});

router.patch('/admin/:id/reject', authenticate, isAdmin, async (req: any, res) => {
  const review = await prisma.review.update({
    where: { id: req.params.id },
    data: { status: 'REJECTED' },
  });
  sendSuccess(res, review, 'Review rejected');
});

router.get('/admin/pending', authenticate, isAdmin, async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const [total, reviews] = await Promise.all([
    prisma.review.count({ where: { status: 'PENDING' } }),
    prisma.review.findMany({
      where: { status: 'PENDING' },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        product: { select: { name: true, images: { where: { isPrimary: true }, take: 1 } } },
      },
      orderBy: { createdAt: 'desc' },
      skip, take: limit,
    }),
  ]);
  res.json({ success: true, data: reviews, meta: paginate(page, limit, total) });
});

export default router;
