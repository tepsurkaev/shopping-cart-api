const Product = require('../models/Product.model');
const BadRequestHandler = require('../errors/BadRequestHandler');
const { queryParams } = require('../utils/queryParams');
const { pagination } = require('../utils/pagination');

class ProductService {
  async isProductAvailable(productId) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new BadRequestHandler(404, 'Товар не найден!');
    }

    return product.amount > 0;
  }

  async increaseProductAmount(productId) {
    await Product.updateOne({ _id: productId }, { $inc: { amount: +1 } });
  }

  async decreaseProductAmount(productId) {
    await Product.updateOne({ _id: productId }, { $inc: { amount: -1 } });
  }

  async getAllProducts(query) {
    const { limit, page, category, subcategory, from, to } = query;

    const skip = pagination(page, limit);

    const collectionCount = await Product.find().countDocuments();
    const totalPages = Math.ceil(collectionCount / limit);

    const products = await Product.find(
      queryParams(from, to, category, subcategory)
    )
      .skip(skip)
      .limit(limit);

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

    const collectionCount = searchedProducts.length;
    const totalPages = Math.ceil(collectionCount / limit);

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
    const newProduct = await Product.create(data);

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

  // Получение для проверки на наличие может не быть лишнем, проверить без получение по id
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
