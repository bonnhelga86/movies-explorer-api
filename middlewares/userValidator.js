const { celebrate, Joi } = require('celebrate');

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, {
  abortEarly: false,
  messages: {
    'string.empty': 'Не заполнено обязательное поле {#label}!',
    'any.required': 'Отсутствует обязательное поле {#label}',
    'string.email': 'Пожалуйста введите корректный email.',
  },
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}, {
  abortEarly: false,
  messages: {
    'string.empty': 'Не заполнено обязательное поле {#label}!',
    'any.required': 'Отсутствует обязательное поле {#label}',
    'string.email': 'Пожалуйста введите корректный email.',
    'string.min': 'В поле {#label} должно быть больше 1 символа.',
    'string.max': 'В поле {#label} должно быть меньше 30 символов.',
  },
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}, {
  abortEarly: false,
  messages: {
    'string.empty': 'Не заполнено обязательное поле {#label}!',
    'any.required': 'Отсутствует обязательное поле {#label}',
    'string.min': 'В поле {#label} должно быть больше 1 символа.',
    'string.max': 'В поле {#label} должно быть меньше 30 символов.',
    'string.email': 'Пожалуйста введите корректный email.',
  },
});

module.exports = {
  loginValidator,
  createUserValidator,
  updateUserValidator,
};
