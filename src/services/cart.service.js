const Cart = require('../models/Cart.model');
const BadRequestHandler = require('../errors/BadRequestHandler');

class CartService {
  async createCart(userId) {
    const cart = await Cart.create({ userId });

    return cart;
  }

  async getCartByUserId(userId) {
    let cart = await Cart.findOne({ userId })
      .populate('products.productId', 'name price images')
      .exec();

    if (!cart) {
      cart = await this.createCart(userId);
    }

    return cart;
  }

  async addProductToCart(userId, product) {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await this.createCart(userId);
    }

    const isProductInCart = cart.products.find(
      (item) => item.productId.toString() === product.productId
    );

    if (isProductInCart) {
      throw new BadRequestHandler(400, 'Товар уже добавлен в корзину!');
    }

    cart.products.push(product);
    await cart.save();

    return cart;
  }

  async removeProductFromCart(userId, productId) {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new BadRequestHandler(404, 'Корзина не найдена!');
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      throw new BadRequestHandler(404, 'Товар не найден!');
    }

    const removed = cart.products[productIndex];

    cart.products.splice(productIndex, 1);
    await cart.save();

    return removed;
  }

  async clearCart(userId) {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new BadRequestHandler(404, 'Корзина не найдена!');
    }

    cart.products = [];
    cart.save();
  }
}

const cartService = new CartService();

module.exports = cartService;
