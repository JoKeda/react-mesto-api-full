const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { getValidation, createCardValidation, changeCardValidation } = require('../validation/index');

router.get('/cards', getValidation, auth, getCards);
router.post('/cards', createCardValidation, auth, createCard);
router.delete('/cards/:cardId', changeCardValidation, auth, deleteCard);
router.put('/cards/:cardId/likes', changeCardValidation, auth, likeCard);
router.delete('/cards/:cardId/likes', changeCardValidation, auth, dislikeCard);

module.exports = router;
