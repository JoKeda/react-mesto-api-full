const {celebrate, Joi} = require("celebrate");

const headers = Joi.object().keys({
  authorization: Joi.string().required()
}).unknown(true);
const avatar = Joi.string().required().pattern(/^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i);

const getValidation = celebrate({
  headers
})
const createCardValidation = celebrate({
  headers,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: avatar
  }).unknown(true)
})
const changeCardValidation = celebrate({
  headers,
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required()
  })
})
const getUserValidation = celebrate({
  headers,
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required()
  })
})
const updateUserValidation = celebrate({
  headers,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(50),
    avatar:Joi.string().pattern(/^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i)
  }).unknown(true)
})
const updateAvatarValidation = celebrate({
  headers,
  body: Joi.object().keys({
    avatar
  }).unknown(true)
})
const authValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true)
})


module.exports = {
  getValidation,
  createCardValidation,
  changeCardValidation,
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
  authValidation
}