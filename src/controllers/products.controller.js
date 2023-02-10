const Product = require('../models/Product.model');

class ProductsController {
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find();

      return res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }

  async createNewProduct(req, res, next) {
    try {
      const { name, price } = req.body;
      const newProduct = await Product.create({ name, price });

      return res.status(200).json(newProduct);
    } catch (e) {
      next(e);
    }
  }
}

const productsController = new ProductsController();

module.exports = productsController;
