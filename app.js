const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(errorLogger);

app.listen(PORT);
