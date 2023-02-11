const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'customer'
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const User = model('User', userSchema);

module.exports = User;
