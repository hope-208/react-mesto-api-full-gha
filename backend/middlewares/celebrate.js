const { celebrate, Joi } = require('celebrate');

const { REGEX_URL } = require('../utils/constants');

module.exports.celebrateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
});

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX_URL),
  })
});

module.exports.celebrateGetUserId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex()
  })
});

module.exports.celebrateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
});

module.exports.celebrateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REGEX_URL),
  })
});

module.exports.celebrateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGEX_URL),
  }),
});

module.exports.celebrateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex()
  })
});

module.exports.celebrateLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex()
  })
});

module.exports.celebrateDislikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex()
  })
});
