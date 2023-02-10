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
      type: Number,
      required: true
    },
    subcategory: {
      type: Number,
      required: true
    },
    images: [String]
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Product = model('Product', productSchema);

module.exports = Product;
