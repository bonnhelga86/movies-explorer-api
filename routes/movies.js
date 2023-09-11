const router = require('express').Router();

const {
  saveMovieValidator,
  movieIdValidator,
} = require('../middlewares/movieValidator');

const {
  getMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', saveMovieValidator, saveMovie);
router.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = router;
