module.exports = (error, req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Что то пошло не так!';

    return res.status(status).json({ status, message });
  } catch (e) {
    next(e);
  }
};
