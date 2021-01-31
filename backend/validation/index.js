const { celebrate, Joi } = require('celebrate');

const headers = Joi.object().keys({
  authorization: Joi.string().required(),
}).unknown(true);
const avatar = Joi.string().required().pattern(/^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i);

const getValidation = celebrate({
  headers,
});
const createCardValidation = celebrate({
  headers,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: avatar,
  }),
});
const changeCardValidation = celebrate({
  headers,
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
});
const getUserValidation = celebrate({
  headers,
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required(),
  }),
});
const updateUserValidation = celebrate({
  headers,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(3).max(30),
  }),
});
const updateAvatarValidation = celebrate({
  headers,
  body: Joi.object().keys({
    avatar,
  }),
});
const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(3).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i)
  }),
});

const linkValidator = (v) => {
  const linkRegex = /^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i;
  return linkRegex.test(v);
};
const emailValidator = (v) => {
  const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  return emailRegex.test(v);
};

module.exports = {
  getValidation,
  createCardValidation,
  changeCardValidation,
  getUserValidation,
  updateUserValidation,
  updateAvatarValidation,
  signinValidation,
  signupValidation,
  linkValidator,
  emailValidator,
};
