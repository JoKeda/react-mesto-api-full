const router = require('express').Router();
const {
  getUsers, getProfile, createUser, updateUser, updateAvatar, signin, getCurrentUser
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  getValidation,
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
  authValidation,
} = require('../validation/index')


router.get('/users', getValidation, auth, getUsers);
router.get('/users/me', getValidation, auth, getCurrentUser);
router.get('/users/:id', getUserValidation, auth, getProfile);
router.patch('/users/me', updateUserValidation, auth, updateUser);
router.patch('/users/me/avatar',updateAvatarValidation, auth, updateAvatar);
router.post('/signin',authValidation, signin);
router.post('/signup',authValidation, createUser);

module.exports = router;
