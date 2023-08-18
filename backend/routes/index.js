const express = require('express');

const app = express();

const cors = require('cors');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const { requestLogger } = require('../middlewares/logger');

const NotFoundError = require('../errors/NotFoundError');

app.use(express.json());

app.use(cors());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./users'));
app.use('/', require('./cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

module.exports = app;