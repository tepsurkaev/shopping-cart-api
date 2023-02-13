const { Router } = require('express');
const cartsController = require('../controllers/carts.controller');

const router = Router();

router.get('/:userId', cartsController.getCartByUserId);
router.put('/:userId/:productId/add', cartsController.addProductToCart);
router.put('/:userId/:productId/remove', cartsController.removeProductFromCart);
router.put('/:userId/clear', cartsController.clearCart);

module.exports = router;
