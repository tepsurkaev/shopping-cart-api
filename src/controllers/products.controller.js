const Product = require('../models/Product.model');

class ProductsController {
  async getAllProducts(req, res, next) {
    try {
      const { limit = 30 } = req.query;

      const collectionCount = await Product.countDocuments();
      const totalPages = Math.ceil(collectionCount / limit);
      const products = await Product.find().limit(limit);

      return res.status(200).json({
        collection: products,
        metadata: {
          page: 1,
          limit,
          totalPages,
          collectionCount
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async searchProducts(req, res, next) {
    try {
      const { query } = req.query;
      const searchPattern = new RegExp(query, 'i');
      const searchedProducts = await Product.find({
        name: { $regex: searchPattern }
      });

      return res.status(200).json(searchedProducts);
    } catch (e) {
      next(e);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).send('Товар не найден!');
      }

      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  async createNewProduct(req, res, next) {
    try {
      const { name, price, category, subcategory, type } = req.body;
      const newProduct = await Product.create({
        name,
        price,
        category,
        subcategory,
        type
      });

      return res.status(200).json(newProduct);
    } catch (e) {
      next(e);
    }
  }

  async updateProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).send('Товар не найден!');
      }

      Object.assign(product, req.body);
      await product.save();

      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).send('Товар не найден!');
      }

      const deletedProduct = await Product.findByIdAndDelete(id);

      return res.status(200).json(deletedProduct);
    } catch (e) {
      next(e);
    }
  }
}

const productsController = new ProductsController();

module.exports = productsController;
