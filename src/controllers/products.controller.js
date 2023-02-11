const Product = require('../models/Product.model');
const { queryParams } = require('../services/queryParams');
const { pagination } = require('../services/pagination');
const { documentsCount } = require('../services/documentsCount');
const {
  searchedDocumentsCount
} = require('../services/searchedDocumentsCount');

class ProductsController {
  async getAllProducts(req, res, next) {
    try {
      const {
        limit = 30,
        page = 1,
        category,
        subcategory,
        from,
        to
      } = req.query;

      const skip = pagination(page, limit);
      const { collectionCount, totalPages } = await documentsCount(
        Product,
        limit
      );

      const products = await Product.find(
        queryParams(from, to, category, subcategory)
      )
        .skip(skip)
        .limit(limit);

      return res.status(200).json({
        collection: products,
        metadata: {
          page,
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
      const {
        limit = 30,
        page = 1,
        query,
        category,
        subcategory,
        from,
        to
      } = req.query;

      if (!query) {
        return res.send('Необходимо передать искомое значение!');
      }

      const skip = pagination(page, limit);

      const searchedProducts = await Product.find(
        queryParams(from, to, category, subcategory, query)
      )
        .skip(skip)
        .limit(limit);

      const { collectionCount, totalPages } = searchedDocumentsCount(
        searchedProducts,
        limit
      );

      return res.status(200).json({
        collection: searchedProducts,
        metadata: {
          page,
          limit,
          totalPages,
          collectionCount
        }
      });
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
