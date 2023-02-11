const User = require('../models/User.model');
const userService = require('../services/userService');

class UsersController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;

      await userService.registration(email, password);

      return res.status(200).send('Регистрация прошла успешно!');
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).send('Email или пароль указан неверно!');
      }

      const isPasswordCorrect = await userService.comparePasswords(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).send('Email или пароль указан неверно!');
      }

      const payload = {
        id: user._id,
        email: user.email
      };

      const { JWT_SECRET_KEY } = process.env;

      const token = await userService.tokenGenerator(
        payload,
        JWT_SECRET_KEY,
        '7d'
      );

      return res.status(200).json({ accessToken: token });
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      return res.status(200);
    } catch (e) {
      next(e);
    }
  }
}

const usersController = new UsersController();

module.exports = usersController;
