const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { ValidationError } = require('../errors/validation-error');
const { NotFoundError } = require('../errors/not-found-error');
const { ForbiddenError } = require('../errors/forbidden-error');

module.exports.getMovies = async (req, res, next) => {
  const owner = req.user;
  try {
    const cards = await Movie.find({ owner }).populate('owner');
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

module.exports.saveMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      owner,
      movieId,
    });
    const newMovie = await Movie.findById(movie._id).populate('owner');
    res.status(201).send(newMovie);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ValidationError('Некорректно заполнено одно из полей'));
    } else {
      next(error);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).populate('owner');
    if (!movie) throw new NotFoundError('Фильм не найден');
    if (!movie.owner._id.equals(req.user._id)) throw new ForbiddenError('Вы можете удалять только свои фильмы');
    await Movie.findByIdAndRemove(req.params.movieId);
    res.send({ message: 'Фильм удален из сохраненных' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new ValidationError('Не валидный id!'));
    } else {
      next(error);
    }
  }
};
