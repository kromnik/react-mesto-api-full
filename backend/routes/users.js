const usersRouter = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { validateUserId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validators');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:userId', validateUserId, getUserById);
usersRouter.patch('/users/me', validateUpdateProfile, updateProfile);
usersRouter.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = usersRouter;
