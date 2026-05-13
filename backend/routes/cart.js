const router = require('express').Router();
const ctrl   = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');

router.get('/',               authenticate, ctrl.get);
router.post('/items',         authenticate, ctrl.addItem);
router.patch('/items/:itemId',authenticate, ctrl.updateItem);
router.delete('/items/:itemId',authenticate,ctrl.removeItem);
router.delete('/clear',       authenticate, ctrl.clear);

module.exports = router;
