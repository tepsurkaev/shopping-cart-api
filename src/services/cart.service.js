const Cart = require('../models/Cart.model');
const BadRequestHandler = require('../errors/BadRequestHandler');
const ProductService = require('./product.service');

class CartService {
  productService = ProductService;

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

    const totalProducts = cart.products.length;
    const totalPrice = cart.products.reduce(
      (acc, curr) => acc + curr.productId.price * curr.quantity,
      0
    );

    return { cart, totalProducts, totalPrice };
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

    this.productService.decreaseProductAmount(product.productId);

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

    this.productService.increaseProductAmount(productId);

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

  async increaseCartProductQuantity(userId, productId) {
    const cart = await Cart.findOne({ userId });

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      throw new BadRequestHandler(404, 'Товар не найден!');
    }

    const isProductAvailable = await this.productService.isProductAvailable(
      productId
    );

    if (isProductAvailable) {
      cart.products[productIndex].quantity++;
      this.productService.decreaseProductAmount(productId);
      await cart.save();
    } else {
      throw new BadRequestHandler(404, 'Товара нет в наличии!');
    }
  }

  async decreaseCartProductQuantity(userId, productId) {
    const cart = await Cart.findOne({ userId });

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      throw new BadRequestHandler(404, 'Товар не найден!');
    }

    const productQuantity = cart.products[productIndex].quantity;

    cart.products[productIndex].quantity--;
    await cart.save();

    if (productQuantity > 1) {
      this.productService.increaseProductAmount(productId);
    }
  }
}

const cartService = new CartService();

module.exports = cartService;
