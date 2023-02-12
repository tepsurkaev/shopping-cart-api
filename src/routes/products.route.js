const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/search', productsController.searchProducts);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', authMiddleware, productsController.createNewProduct);
router.patch('/:id', authMiddleware, productsController.updateProductById);
router.delete('/:id', authMiddleware, productsController.deleteProductById);

module.exports = router;
