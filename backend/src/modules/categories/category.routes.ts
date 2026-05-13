import { Router } from 'express';
import { prisma } from '../../configs/database';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.util';
import { cache } from '../../configs/redis';
import slugify from 'slugify';

const router = Router();

router.get('/', async (_req, res) => {
  const cached = await cache.get('categories:all');
  if (cached) return sendSuccess(res, cached);

  const categories = await prisma.category.findMany({
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
  await cache.set('categories:all', tree, 3600);
  sendSuccess(res, tree);
});

router.get('/tree', async (_req, res) => {
  const categories = await prisma.category.findMany({
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
  sendSuccess(res, categories);
});

router.get('/:slug', async (req, res) => {
  const category = await prisma.category.findUnique({
    where: { slug: req.params.slug, deletedAt: null },
    include: { children: { where: { isActive: true } } },
  });
  sendSuccess(res, category);
});

router.post('/', authenticate, isAdmin, async (req: any, res) => {
  const slug = slugify(req.body.name, { lower: true, strict: true });
  const category = await prisma.category.create({
    data: { ...req.body, slug },
  });
  await cache.del('categories:all');
  sendCreated(res, category, 'Category created');
});

router.put('/:id', authenticate, isAdmin, async (req: any, res) => {
  const category = await prisma.category.update({
    where: { id: req.params.id },
    data: req.body,
  });
  await cache.del('categories:all');
  sendSuccess(res, category, 'Category updated');
});

router.delete('/:id', authenticate, isAdmin, async (req: any, res) => {
  await prisma.category.update({
    where: { id: req.params.id },
    data: { deletedAt: new Date(), isActive: false },
  });
  await cache.del('categories:all');
  sendSuccess(res, null, 'Category deleted');
});

export default router;
