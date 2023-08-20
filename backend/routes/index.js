const express = require('express');

const app = express();

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const {
  requestLogger
} = require('../middlewares/logger');

const NotFoundError = require('../errors/NotFoundError');

app.use(express.json());

app.use(cors({
  origin: [
    'https://mesto.hope-208.nomoreparties.co',
    'http://mesto.hope-208.nomoreparties.co',
    'https://api.mesto.hope-208.nomoreparties.co',
    'http://api.mesto.hope-208.nomoreparties.co',
    'https://mesto.nomoreparties.co/v1/cohort-65',
    'http://mesto.nomoreparties.co/v1/cohort-65',
    'http://localhost:3000',
    'http://localhost:4000'
  ],
  credentials: true,
}));

app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

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
