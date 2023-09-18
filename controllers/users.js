const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ValidationError } = require('../errors/validation-error');
const { DuplicateError } = require('../errors/duplicate-error');
const { AuthorizationError } = require('../errors/authorization-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ValidationError('При обновлении профиля произошла ошибка.'));
    } else if (error.code === 11000) {
      next(new DuplicateError('Пользователь с таким email уже существует'));
    } else {
      next(error);
    }
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    });
    res.status(201).send({
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ValidationError('При регистрации пользователя произошла ошибка.'));
    } else if (error.code === 11000) {
      next(new DuplicateError('Пользователь с таким email уже существует'));
    } else {
      next(error);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AuthorizationError('Вы ввели неправильный логин или пароль.');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new AuthorizationError('Вы ввели неправильный логин или пароль.');

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'user-secret-key',
      { expiresIn: '7d' },
    );
    res.cookie('jwtToken', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    }).send({ email: user.email });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ValidationError('Некорректно заполнено одно из полей'));
    } else {
      next(error);
    }
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie('jwtToken').send({ message: 'Вы вышли из аккаунта' });
};
