const cartService = require('../services/cart.service');

class CartsController {
  async getCartByUserId(req, res, next) {
    try {
      const { userId } = req.params;

      const cart = await cartService.getCartByUserId(userId);

      return res
        .status(200)
        .json({ status: 200, message: 'Корзина успешно получена!', cart });
    } catch (e) {
      next(e);
    }
  }

  async addProductToCart(req, res, next) {
    try {
      const { userId, productId } = req.params;
      const { quantity } = req.body;

      const cart = await cartService.addProductToCart(userId, {
        productId,
        quantity
      });

      return res.status(200).json({
        status: 200,
        message: 'Товар успешно добавлен в корзину!',
        cart
      });
    } catch (e) {
      next(e);
    }
  }

  async removeProductFromCart(req, res, next) {
    try {
      const { userId, productId } = req.params;

      const removed = await cartService.removeProductFromCart(
        userId,
        productId
      );

      return res.status(200).json({
        status: 200,
        message: 'Товар успешно удалён из корзины!',
        removed
      });
    } catch (e) {
      next(e);
    }
  }

  async clearCart(req, res, next) {
    try {
      const { userId } = req.params;

      await cartService.clearCart(userId);

      return res.status(200).json({
        status: 200,
        message: 'Корзина успешно очищена!'
      });
    } catch (e) {
      next(e);
    }
  }
}

const cartsController = new CartsController();

module.exports = cartsController;
