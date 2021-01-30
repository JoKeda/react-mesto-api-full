const { model, Schema, Types } = require('mongoose');
const { linkValidator } = require('../validation/index');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: linkValidator,
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: [Types.ObjectId],
    default: null,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
