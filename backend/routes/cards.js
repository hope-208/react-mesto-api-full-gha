const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  celebrateCreateCard,
  celebrateDeleteCard,
  celebrateLikeCard,
  celebrateDislikeCard
} = require('../middlewares/celebrate');

const {
  getCardsAll,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCardsAll);

router.post('/cards', auth, celebrateCreateCard, createCard);

router.delete('/cards/:cardId', auth, celebrateDeleteCard, deleteCard);

router.put('/cards/:cardId/likes', auth, celebrateLikeCard, likeCard);

router.delete('/cards/:cardId/likes', auth, celebrateDislikeCard, dislikeCard);

module.exports = router;
