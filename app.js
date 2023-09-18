const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { limiter } = require('./utils/rateLimitConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['https://movies--explorer.nomoredomainsicu.ru/signup'],
  credentials: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(helmet());

app.use(requestLogger);
app.use(limiter);

app.use('', require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
