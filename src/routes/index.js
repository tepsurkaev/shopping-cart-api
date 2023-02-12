const { Router } = require('express');

const productsRoutes = require('./products.route');
const usersRoutes = require('./users.route');

const router = Router();

router.use('/product', productsRoutes);
router.use('/', usersRoutes);

module.exports = router;
