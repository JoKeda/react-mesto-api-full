const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {
  NotFoundError,
  WrongDataError,
  AlreadyExistsError,
  UnauthorizedError,
} = require('../errors/index');

const { ObjectId } = Types;

const { jwtSecret } = require('../config/index');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (e) {
    next(e);
  }
};
const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    if (!ObjectId.isValid(userId)) next(new WrongDataError('Некорректный ID'));
    const user = await User.findById(userId);
    if (!user) next(new NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (e) {
    next(e);
  }
};

const getProfile = async (req, res, next) => {
  const userId = req.params.id;
  try {
    if (!ObjectId.isValid(req.params.id)) next(new NotFoundError('Неправильное значение ID'));
    const user = await User.findById(userId);
    if (!user) {
      next(new NotFoundError('Пользователь с таким ID не найден'));
    }else {
    return res.send(user);
    }
  } catch (e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      next(new AlreadyExistsError('Пользователь с таким email уже существует'));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      const sendingUser = user.toObject();
      delete sendingUser.password;
      return res.status(201).send(sendingUser);
    }
  } catch (e) {
    next(e);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError('Неправильный почта/пароль'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      next(new UnauthorizedError('Неправильный почта/пароль'));
    }else{
    const token = jwt.sign(
      { _id: user?._id },
      jwtSecret,
      { expiresIn: '7d' },
    );
    return res.send({ token });
    }
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User
      .findByIdAndUpdate(userId, { $set: req.body }, { new: true, runValidators: true });
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
    }else{
    return res.send(user);
    }
  } catch (e) {
    next(e);
  }
};

const updateAvatar = async (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  try {
    const user = await User
      .findByIdAndUpdate(userId, { $set: { avatar } }, { new: true, runValidators: true });
    if (!user) next(new NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers, getProfile, createUser, updateUser, updateAvatar, signin, getCurrentUser,
};
