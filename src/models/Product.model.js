const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    subcategory: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    images: [String]
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Product = model('Product', productSchema);

module.exports = Product;
