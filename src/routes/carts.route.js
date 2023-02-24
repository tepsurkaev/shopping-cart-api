const { Router } = require('express');
const cartsController = require('../controllers/carts.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/:userId', authMiddleware, cartsController.getCartByUserId);
router.put(
  '/:userId/:productId/add',
  authMiddleware,
  cartsController.addProductToCart
);
router.put(
  '/:userId/:productId/remove',
  authMiddleware,
  cartsController.removeProductFromCart
);
router.put('/:userId/clear', authMiddleware, cartsController.clearCart);
router.put(
  '/:userId/:productId/quantity/inc',
  authMiddleware,
  cartsController.increaseCartProductQuantity
);
router.put(
  '/:userId/:productId/quantity/dec',
  authMiddleware,
  cartsController.decreaseCartProductQuantity
);

module.exports = router;
