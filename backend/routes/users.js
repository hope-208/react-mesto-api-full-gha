const router = require('express').Router();

const {
  celebrateLogin,
  celebrateCreateUser,
  celebrateGetUserId,
  celebrateUpdateUser,
  celebrateUpdateUserAvatar
} = require('../middlewares/celebrate');

const {
  login,
  createUser,
  getUsersAll,
  getUserId,
  getUsersMe,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

router.post('/signin', celebrateLogin, login);
router.post('/signup', celebrateCreateUser, createUser);

router.get('/users', auth, getUsersAll);
router.get('/users/me', auth, getUsersMe);

router.get('/users/:_id', auth, celebrateGetUserId, getUserId);
router.patch('/users/me', auth, celebrateUpdateUser, updateUser);
router.patch('/users/me/avatar', auth, celebrateUpdateUserAvatar, updateUserAvatar);

module.exports = router;
