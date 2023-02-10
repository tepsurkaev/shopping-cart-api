const { Router } = require('express');

const productsRoutes = require('./products.route');

const router = Router();

router.use('/product', productsRoutes);

module.exports = router;
