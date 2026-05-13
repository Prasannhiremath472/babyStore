import { Router } from 'express';
import { prisma } from '../../configs/database';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.util';
import { cache } from '../../configs/redis';

const router = Router();

router.get('/', async (req, res) => {
  const type = req.query.type as string;
  const cacheKey = `banners:${type || 'all'}`;
  const cached = await cache.get(cacheKey);
  if (cached) return sendSuccess(res, cached);

  const now = new Date();
  const where: any = {
    isActive: true,
    OR: [
      { startDate: null },
      { startDate: { lte: now } },
    ],
    AND: [
      { OR: [{ endDate: null }, { endDate: { gte: now } }] },
    ],
  };
  if (type) where.type = type.toUpperCase();

  const banners = await prisma.banner.findMany({
    where,
    orderBy: { sortOrder: 'asc' },
  });

  await cache.set(cacheKey, banners, 300);
  sendSuccess(res, banners);
});

router.get('/admin', authenticate, isAdmin, async (_req, res) => {
  const banners = await prisma.banner.findMany({ orderBy: { sortOrder: 'asc' } });
  sendSuccess(res, banners);
});

router.post('/admin', authenticate, isAdmin, async (req: any, res) => {
  const banner = await prisma.banner.create({ data: req.body });
  await cache.delPattern('banners:*');
  sendCreated(res, banner);
});

router.put('/admin/:id', authenticate, isAdmin, async (req: any, res) => {
  const banner = await prisma.banner.update({ where: { id: req.params.id }, data: req.body });
  await cache.delPattern('banners:*');
  sendSuccess(res, banner, 'Banner updated');
});

router.delete('/admin/:id', authenticate, isAdmin, async (req: any, res) => {
  await prisma.banner.delete({ where: { id: req.params.id } });
  await cache.delPattern('banners:*');
  sendSuccess(res, null, 'Banner deleted');
});

export default router;
