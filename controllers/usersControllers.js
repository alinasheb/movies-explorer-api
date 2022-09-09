const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_STORAGE_TIME, SALT_LENGTH, JWT_SECRET } = require('../utils/config');

const NotFound = require('../errors/NotFound');
const ConflictingRequest = require('../errors/ConflictingRequest');
const BadRequest = require('../errors/BadRequest');

// возвращает информацию о пользователе (GET /users/me)
const getUserMe = (req, res, next) => {
  // const { id } = req.params;
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь с таким id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
// обновляет информацию о пользователе (PATCH /users/me)
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с таким id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// создание пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, SALT_LENGTH)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictingRequest('Email уже существует'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_STORAGE_TIME });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserMe,
  createUser,
  updateUser,
  login,
};
