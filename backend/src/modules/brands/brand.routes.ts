import { Router } from 'express';
import { prisma } from '../../configs/database';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.util';
import slugify from 'slugify';

const router = Router();

router.get('/', async (req, res) => {
  const brands = await prisma.brand.findMany({
    where: { isActive: true, deletedAt: null },
    select: {
      id: true, name: true, slug: true, logo: true, isFeatured: true,
      _count: { select: { products: true } },
    },
    orderBy: { name: 'asc' },
  });
  sendSuccess(res, brands);
});

router.get('/featured', async (_req, res) => {
  const brands = await prisma.brand.findMany({
    where: { isFeatured: true, isActive: true, deletedAt: null },
    orderBy: { sortOrder: 'asc' },
  });
  sendSuccess(res, brands);
});

router.post('/', authenticate, isAdmin, async (req: any, res) => {
  const slug = slugify(req.body.name, { lower: true, strict: true });
  const brand = await prisma.brand.create({ data: { ...req.body, slug } });
  sendCreated(res, brand);
});

router.put('/:id', authenticate, isAdmin, async (req: any, res) => {
  const brand = await prisma.brand.update({ where: { id: req.params.id }, data: req.body });
  sendSuccess(res, brand, 'Brand updated');
});

router.delete('/:id', authenticate, isAdmin, async (req: any, res) => {
  await prisma.brand.update({
    where: { id: req.params.id },
    data: { deletedAt: new Date(), isActive: false },
  });
  sendSuccess(res, null, 'Brand deleted');
});

export default router;
