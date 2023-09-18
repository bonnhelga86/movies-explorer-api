const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors/authorization-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  if (!jwtToken) {
    throw new AuthorizationError(`При авторизации произошла ошибка.
      Токен не передан или передан не в том формате.`);
  }
  let payload;
  try {
    payload = jwt.verify(jwtToken, NODE_ENV === 'production' ? JWT_SECRET : 'user-secret-key');
  } catch (error) {
    throw new AuthorizationError(`При авторизации произошла ошибка.
      Переданный токен некорректен.`);
  }
  req.user = payload;
  next();
};
