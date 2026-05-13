import { Router } from 'express';
import { productController } from './product.controller';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';
import { auditLog } from '../../middlewares/audit.middleware';

const router = Router();

// Public
router.get('/', productController.list.bind(productController));
router.get('/featured', productController.getFeatured.bind(productController));
router.get('/bestsellers', productController.getBestsellers.bind(productController));
router.get('/:id/related', productController.getRelated.bind(productController));
router.get('/slug/:slug', productController.getBySlug.bind(productController));
router.get('/:id', productController.getById.bind(productController));

// Admin only
router.post(
  '/',
  authenticate, isAdmin,
  auditLog({ action: 'CREATE', resource: 'Product', getResourceId: req => req.body.sku }),
  productController.create.bind(productController)
);
router.put(
  '/:id',
  authenticate, isAdmin,
  auditLog({ action: 'UPDATE', resource: 'Product', getResourceId: req => req.params.id }),
  productController.update.bind(productController)
);
router.patch(
  '/:id/approve',
  authenticate, isAdmin,
  auditLog({ action: 'APPROVE', resource: 'Product', getResourceId: req => req.params.id }),
  productController.approve.bind(productController)
);
router.delete(
  '/:id',
  authenticate, isAdmin,
  auditLog({ action: 'DELETE', resource: 'Product', getResourceId: req => req.params.id }),
  productController.delete.bind(productController)
);
router.patch(
  '/inventory/:variantId',
  authenticate, isAdmin,
  auditLog({ action: 'UPDATE', resource: 'Inventory', getResourceId: req => req.params.variantId }),
  productController.updateInventory.bind(productController)
);

export default router;
