const { model, Schema } = require('mongoose');
const linkValidator = require('../helpers/linkValidator');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select:false
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default:'Жак-Ив Кусто'
  },
  about: {
    type: String,
    default:'Исследователь'
  },
  avatar: {
    type: String,
    validate: {
      validator: linkValidator,
      message: 'Некорректная ссылка',
    },
    default:'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
});

module.exports = model('user', userSchema);
