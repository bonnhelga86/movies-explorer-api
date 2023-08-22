const router = require('express').Router();

const {
  login,
  createUser,
  logout,
} = require('../controllers/users');

const { auth } = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.post('/signout', logout);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
