const jwt = require('jsonwebtoken');
const BadRequestHandler = require('../errors/BadRequestHandler');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new BadRequestHandler(401, 'Authorization header is required!');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new BadRequestHandler(401, 'Token type must be Bearer!');
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (e) {
    next(e);
  }
};
