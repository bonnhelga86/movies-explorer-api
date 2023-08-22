const express = require('express');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(errorLogger);

app.listen(PORT);
