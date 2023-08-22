const mongoose = require('mongoose');
const BadRequestError = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const CentralizedError = require('./CentralizedError');

const ValidationError = (err, next) => {
  if (err instanceof mongoose.Error.ValidationError || err.name === 'ValidationError') {
    return next(new BadRequestError('Переданы некорректные данные.'));
  } if (err instanceof mongoose.Error.CastError || err.name === 'CastError') {
    return next(new BadRequestError('Передан некорректный id.'));
  } if (err.code === 11000) {
    return next(new ConflictError('Пользователь с таким уже Email существует.'));
  } return next(new CentralizedError());
};

module.exports = ValidationError;
