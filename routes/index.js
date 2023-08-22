const router = require('express').Router();

const {
  login,
  createUser,
  logout,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
router.post('/signout', logout);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
