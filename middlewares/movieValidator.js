const { celebrate, Joi } = require('celebrate');

const saveMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/(www.)?[a-z0-9-]{2,}\.[a-z]{2,6}(S)*/),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/(www.)?[a-z0-9-]{2,}\.[a-z]{2,6}(S)*/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(www.)?[a-z0-9-]{2,}\.[a-z]{2,6}(S)*/),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}, {
  abortEarly: false,
  messages: {
    'string.empty': 'Не заполнено обязательное поле {#label}!',
    'any.required': 'Отсутствует обязательное поле {#label}',
    'string.pattern.base': 'Пожалуйста введите корректную ссылку.',
    'number.integer': 'Значение должно быть целым числом',
  },
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}, {
  abortEarly: false,
  messages: {
    'string.empty': 'Не заполнено обязательное поле {#label}!',
    'any.required': 'Отсутствует обязательное поле {#label}',
    'string.length': 'Не валидный id!',
    'string.hex': 'id должен содержать только hex символы',
  },
});

module.exports = {
  saveMovieValidator,
  movieIdValidator,
};
