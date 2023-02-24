const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/profile', authMiddleware, usersController.getAuthedUser);
router.post('/registration', usersController.registration);
router.post('/login', usersController.login);

module.exports = router;
