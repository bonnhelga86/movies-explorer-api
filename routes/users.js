const router = require('express').Router();
const { updateUserValidator } = require('../middlewares/userValidator');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
