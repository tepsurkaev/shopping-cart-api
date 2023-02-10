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

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  async createNewProduct(req, res, next) {
    try {
      const { name, price, category, subcategory } = req.body;
      const newProduct = await Product.create({
        name,
        price,
        category,
        subcategory
      });

      return res.status(200).json(newProduct);
    } catch (e) {
      next(e);
    }
  }

  async updateProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, ...req.body);

      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);

      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }
}

const productsController = new ProductsController();

module.exports = productsController;
