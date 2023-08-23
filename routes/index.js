const router = require('express').Router();
const {
  loginValidator,
  createUserValidator,
} = require('../middlewares/userValidator');

const {
  login,
  createUser,
  logout,
} = require('../controllers/users');

const { auth } = require('../middlewares/auth');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(auth);

router.post('/signout', logout);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
