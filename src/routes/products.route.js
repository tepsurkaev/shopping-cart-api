const { Router } = require('express');

const productsController = require('../controllers/products.controller');

const router = Router();

router.get('/search', productsController.searchProducts);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createNewProduct);
router.patch('/:id', productsController.updateProductById);
router.delete('/:id', productsController.deleteProductById);

module.exports = router;
