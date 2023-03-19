const User = require('../models/User.model');
const BadRequestHandler = require('../errors/BadRequestHandler');
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
    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
  }

  async isAdmin(userId) {
    const user = await User.findById(userId);

    if (user.role !== 'admin') {
      throw new BadRequestHandler(400, 'Нет прав доступа!');
    }
  }

  async getAuthedUser(userId) {
    const user = await User.findById(userId).select(['-__v', '-password']);

    if (!user) {
      throw new BadRequestHandler(404, 'Профиль не найден!');
    }

    return user;
  }

  async registration(email, password) {
    const hashed = await this.hashPassword(password);
    const registered = await User.create({ email, password: hashed });

    return registered;
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestHandler(401, 'Email или пароль указан неверно!');
    }

    const isPasswordCorrect = await this.comparePasswords(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new BadRequestHandler(401, 'Email или пароль указан неверно!');
    }

    const payload = {
      id: user._id,
      email: user.email
    };

    const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

    const token = await this.tokenGenerator(
      payload,
      JWT_SECRET_KEY,
      JWT_EXPIRES_IN
    );

    return { accessToken: token };
  }
}

const userService = new UserService();

module.exports = userService;
