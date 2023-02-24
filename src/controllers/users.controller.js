const userService = require('../services/user.service');

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

      const { accessToken } = await userService.login(email, password);

      const json = {
        status: 200,
        message: 'Вы успешно вошли в систему!',
        entity: { accessToken }
      };

      return res.status(200).json(json);
    } catch (e) {
      next(e);
    }
  }

  async getAuthedUser(req, res, next) {
    try {
      const userId = req.user.id;

      const user = await userService.getAuthedUser(userId);

      return res
        .status(200)
        .json({ status: 200, message: 'Пользователь получен!', user });
    } catch (e) {
      next(e);
    }
  }
}

const usersController = new UsersController();

module.exports = usersController;
