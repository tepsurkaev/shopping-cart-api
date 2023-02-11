const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  async hashPassword(password) {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async comparePasswords(password, hashed) {
    const isMatch = await bcrypt.compare(password, hashed);

    return isMatch;
  }

  async tokenGenerator(payload, secretKey, expiresIn) {
    const token = await jwt.sign(payload, secretKey, { expiresIn });

    return token;
  }

  async registration(email, password) {
    const hashed = await this.hashPassword(password);
    const registered = await User.create({ email, password: hashed });

    return registered;
  }

  async login(email, password) {}

  async logout() {}
}

const userService = new UserService();

module.exports = userService;
