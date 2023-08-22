const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  if (!jwtToken) {
    throw new Error('Ошибка авторизации');
  }
  let payload;
  try {
    payload = jwt.verify(jwtToken, NODE_ENV === 'production' ? JWT_SECRET : 'user-secret-key');
  } catch (error) {
    next(new Error('Ошибка авторизации'));
  }
  req.user = payload;
  next();
};
