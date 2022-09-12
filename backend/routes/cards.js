const cardsRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validators');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', validateCreateCard, createCard);
cardsRouter.delete('/cards/:cardId', validateCardId, deleteCard);
cardsRouter.put('/cards/:cardId/likes', validateCardId, likeCard);
cardsRouter.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRouter;
