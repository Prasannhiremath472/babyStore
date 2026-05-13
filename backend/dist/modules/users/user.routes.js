"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_service_1 = require("./user.service");
const response_util_1 = require("../../utils/response.util");
const router = (0, express_1.Router)();
router.get('/profile', auth_middleware_1.authenticate, async (req, res) => {
    const user = await user_service_1.userService.getProfile(req.user.id);
    (0, response_util_1.sendSuccess)(res, user);
});
router.put('/profile', auth_middleware_1.authenticate, async (req, res) => {
    const user = await user_service_1.userService.updateProfile(req.user.id, req.body);
    (0, response_util_1.sendSuccess)(res, user, 'Profile updated');
});
router.get('/addresses', auth_middleware_1.authenticate, async (req, res) => {
    const user = await user_service_1.userService.getProfile(req.user.id);
    (0, response_util_1.sendSuccess)(res, user.addresses);
});
router.post('/addresses', auth_middleware_1.authenticate, async (req, res) => {
    const address = await user_service_1.userService.addAddress(req.user.id, req.body);
    (0, response_util_1.sendSuccess)(res, address, 'Address added', 201);
});
router.put('/addresses/:id', auth_middleware_1.authenticate, async (req, res) => {
    const address = await user_service_1.userService.updateAddress(req.user.id, req.params.id, req.body);
    (0, response_util_1.sendSuccess)(res, address, 'Address updated');
});
router.delete('/addresses/:id', auth_middleware_1.authenticate, async (req, res) => {
    await user_service_1.userService.deleteAddress(req.user.id, req.params.id);
    (0, response_util_1.sendSuccess)(res, null, 'Address deleted');
});
router.get('/wishlist', auth_middleware_1.authenticate, async (req, res) => {
    const wishlist = await user_service_1.userService.getWishlist(req.user.id);
    (0, response_util_1.sendSuccess)(res, wishlist);
});
router.post('/wishlist/:productId', auth_middleware_1.authenticate, async (req, res) => {
    const result = await user_service_1.userService.toggleWishlist(req.user.id, req.params.productId);
    (0, response_util_1.sendSuccess)(res, result);
});
router.get('/admin/all', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    const result = await user_service_1.userService.findAll(req.query);
    res.json({ success: true, ...result });
});
router.patch('/admin/:id/block', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    await user_service_1.userService.blockUser(req.params.id);
    (0, response_util_1.sendSuccess)(res, null, 'User blocked');
});
router.patch('/admin/:id/unblock', auth_middleware_1.authenticate, auth_middleware_1.isAdmin, async (req, res) => {
    await user_service_1.userService.unblockUser(req.params.id);
    (0, response_util_1.sendSuccess)(res, null, 'User unblocked');
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map