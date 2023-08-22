const mongoose = require('mongoose');
const Movie = require('../models/movie');

module.exports.getMovies = async (req, res, next) => {
  const owner = req.user;
  try {
    const cards = await Movie.find({ owner }).populate('owner').populate('likes');
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
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
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      owner,
    });
    const newMovie = await Movie.findById(movie._id).populate('owner');
    res.status(201).send(newMovie);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new Error('Некорректно заполнено одно из полей'));
    } else {
      next(error);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndRemove(req.params.cardId);
    res.send({ message: 'Фильм удален из сохраненных' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new Error('Не валидный id!'));
    } else {
      next(error);
    }
  }
};
