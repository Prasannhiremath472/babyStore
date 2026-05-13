const router = require('express').Router();
const ctrl   = require('../controllers/productController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/',               ctrl.list);
router.get('/featured',       ctrl.getFeatured);
router.get('/bestsellers',    ctrl.getBestsellers);
router.get('/slug/:slug',     ctrl.getBySlug);
router.get('/:id',            ctrl.getById);
router.post('/',              authenticate, isAdmin, ctrl.create);
router.put('/:id',            authenticate, isAdmin, ctrl.update);
router.delete('/:id',         authenticate, isAdmin, ctrl.remove);

module.exports = router;
