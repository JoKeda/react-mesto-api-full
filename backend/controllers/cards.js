const { Types } = require('mongoose');
const Card = require('../models/Card');
const {WrongDataError,NotFoundError} = require('../errors/index')

const { ObjectId } = Types;

const getCards = async (req, res,next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.status(200).send(cards);
  } catch (e) {
   next(e)
  }
};

const createCard = async (req, res,next) => {
  try {
    const { name, link } = req.body;
    const { user } = req;
    const card = new Card({ name, link, owner: user._id }).populate(['owner', 'likes']);
    const newCard = (await Card.populate(card, {path: 'owner'})).save();
    res.status(201).send(card)
    return 0;
  } catch (e) {
    next(e)
  }
};

const deleteCard = async (req, res,next) => {
  const { cardId } = req.params;
  if (!ObjectId.isValid(cardId)) next(new WrongDataError('Некорректный ID' ));
  try {
    const deletingCard = await Card.findOneAndDelete({ _id: cardId, owner: req.user._id });
    if (!deletingCard) next(new NotFoundError('Карточка не найдена.' ));
    return res.status(200).send({ message: 'Карточка удалена' });
  } catch (e) {
   next(e)
  }
};

const likeCard = async (req, res,next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  if (!ObjectId.isValid(cardId)) next(new WrongDataError('Некорректный ID'));
  try {
    const card = await Card
      .findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: userId } },
        { new: true, runValidators: true },
      ).populate(['owner', 'likes']);
    if (!card) next(new NotFoundError('Карточка не найдена'));
    return res.status(200).send(card);
  } catch (e) {
    next(e)
  }
};

const dislikeCard = async (req, res,next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  if (!ObjectId.isValid(cardId)) next(new WrongDataError('Некорректный ID'));
  try {
    const card = await Card
      .findByIdAndUpdate(cardId,
        { $pull: { likes: userId } },
        { new: true, runValidators: true }).populate(['owner', 'likes']);
    if (!card) next(new NotFoundError('Карточка не найдена'));
    return res.status(200).send(card);
  } catch (e) {
    next(e)
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
