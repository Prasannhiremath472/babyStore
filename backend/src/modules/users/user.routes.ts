import { Router } from 'express';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware';
import { userService } from './user.service';
import { sendSuccess } from '../../utils/response.util';

const router = Router();

// Customer profile routes
router.get('/profile', authenticate, async (req: any, res) => {
  const user = await userService.getProfile(req.user.id);
  sendSuccess(res, user);
});

router.put('/profile', authenticate, async (req: any, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);
  sendSuccess(res, user, 'Profile updated');
});

router.get('/addresses', authenticate, async (req: any, res) => {
  const user = await userService.getProfile(req.user.id);
  sendSuccess(res, (user as any).addresses);
});

router.post('/addresses', authenticate, async (req: any, res) => {
  const address = await userService.addAddress(req.user.id, req.body);
  sendSuccess(res, address, 'Address added', 201);
});

router.put('/addresses/:id', authenticate, async (req: any, res) => {
  const address = await userService.updateAddress(req.user.id, req.params.id, req.body);
  sendSuccess(res, address, 'Address updated');
});

router.delete('/addresses/:id', authenticate, async (req: any, res) => {
  await userService.deleteAddress(req.user.id, req.params.id);
  sendSuccess(res, null, 'Address deleted');
});

router.get('/wishlist', authenticate, async (req: any, res) => {
  const wishlist = await userService.getWishlist(req.user.id);
  sendSuccess(res, wishlist);
});

router.post('/wishlist/:productId', authenticate, async (req: any, res) => {
  const result = await userService.toggleWishlist(req.user.id, req.params.productId);
  sendSuccess(res, result);
});

// Admin user management
router.get('/admin/all', authenticate, isAdmin, async (req: any, res) => {
  const result = await userService.findAll(req.query);
  res.json({ success: true, ...result });
});

router.patch('/admin/:id/block', authenticate, isAdmin, async (req: any, res) => {
  await userService.blockUser(req.params.id);
  sendSuccess(res, null, 'User blocked');
});

router.patch('/admin/:id/unblock', authenticate, isAdmin, async (req: any, res) => {
  await userService.unblockUser(req.params.id);
  sendSuccess(res, null, 'User unblocked');
});

export default router;
