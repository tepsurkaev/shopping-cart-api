const { Router } = require('express');

const productsRoutes = require('./products.route');
const usersRoutes = require('./users.route');
const cartsRoutes = require('./carts.route');

const router = Router();

router.use('/product', productsRoutes);
router.use('/', usersRoutes);
router.use('/cart', cartsRoutes);

module.exports = router;
