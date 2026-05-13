import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import productRoutes from '../modules/products/product.routes';
import orderRoutes from '../modules/orders/order.routes';
import cartRoutes from '../modules/cart/cart.routes';
import userRoutes from '../modules/users/user.routes';
import categoryRoutes from '../modules/categories/category.routes';
import brandRoutes from '../modules/brands/brand.routes';
import reviewRoutes from '../modules/reviews/review.routes';
import couponRoutes from '../modules/coupons/coupon.routes';
import bannerRoutes from '../modules/banners/banner.routes';
import analyticsRoutes from '../modules/analytics/analytics.routes';
import auditRoutes from '../modules/audit/audit.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/reviews', reviewRoutes);
router.use('/coupons', couponRoutes);
router.use('/banners', bannerRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/audit-logs', auditRoutes);

export default router;
