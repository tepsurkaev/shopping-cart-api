const { Router } = require('express');

const productsController = require('../controllers/products.controller');

const router = Router();

router.get('/', productsController.getAllProducts);
router.post('/', productsController.createNewProduct);

module.exports = router;
