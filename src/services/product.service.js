const Product = require('../models/Product.model');
const BadRequestHandler = require('../errors/BadRequestHandler');
const { queryParams } = require('../utils/queryParams');
const { pagination } = require('../utils/pagination');
const { documentsCount } = require('../utils/documentsCount');

class ProductService {
  async getAllProducts(query) {
    const { limit, page, category, subcategory, from, to } = query;

    const skip = pagination(page, limit);

    const products = await Product.find(
      queryParams(from, to, category, subcategory)
    )
      .skip(skip)
      .limit(limit);

    const { collectionCount, totalPages } = documentsCount(products, limit);

    return { products, collectionCount, totalPages };
  }

  async searchProducts(options) {
    const { limit, page, query, category, subcategory, from, to } = options;

    if (!query) {
      throw new BadRequestHandler(401, 'Необходимо передать искомое значение!');
    }

    const skip = pagination(page, limit);

    const searchedProducts = await Product.find(
      queryParams(from, to, category, subcategory, query)
    )
      .skip(skip)
      .limit(limit);

    const { collectionCount, totalPages } = documentsCount(
      searchedProducts,
      limit
    );

    return { searchedProducts, collectionCount, totalPages };
  }

  async getProductById(id) {
    const product = await Product.findById(id);

    if (!product) {
      throw new BadRequestHandler(404, 'Товар не найден!');
    }

    return product;
  }

  async createNewProduct(data) {
    const { name, price, category, subcategory, type } = data;

    const newProduct = await Product.create({
      name,
      price,
      category,
      subcategory,
      type
    });

    return newProduct;
  }

  async updateProductById(id, data) {
    const product = await Product.findById(id);

    if (!product) {
      throw new BadRequestHandler(404, 'Товар не найден!');
    }

    Object.assign(product, data);
    await product.save();

    return product;
  }

  async deleteProductById(id) {
    const product = await Product.findById(id);

    if (!product) {
      throw new BadRequestHandler(404, 'Товар не найден!');
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    return deletedProduct;
  }
}

const productService = new ProductService();

module.exports = productService;
