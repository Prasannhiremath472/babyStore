const router = require('express').Router();
const ctrl   = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/addresses',        authenticate, ctrl.getAddresses);
router.post('/addresses',       authenticate, ctrl.addAddress);
router.delete('/addresses/:id', authenticate, ctrl.deleteAddress);
router.get('/wishlist',         authenticate, ctrl.getWishlist);
router.post('/wishlist',        authenticate, ctrl.toggleWishlist);
router.put('/profile',          authenticate, ctrl.updateProfile);
router.get('/admin/all',        authenticate, isAdmin, ctrl.adminAll);

module.exports = router;
