const router = require('express').Router();

const {
  getMovies,
  saveMovies,
  deleteMovies,
} = require('../controllers/users');

router.get('/', getMovies);
router.post('/', saveMovies);
router.delete('/:movieId', deleteMovies);

module.exports = router;
