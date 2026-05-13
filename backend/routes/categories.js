const router = require('express').Router();
const ctrl   = require('../controllers/categoryController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/',           ctrl.list);
router.get('/:slug',      ctrl.getBySlug);
router.post('/',          authenticate, isAdmin, ctrl.create);
router.put('/:id',        authenticate, isAdmin, ctrl.update);
router.delete('/:id',     authenticate, isAdmin, ctrl.remove);

module.exports = router;
