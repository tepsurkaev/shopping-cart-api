const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        min: [1, 'Кол-во не должно быть меньше 1!'],
        required: true
      }
    }
  ],
  totalProducts: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  }
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
