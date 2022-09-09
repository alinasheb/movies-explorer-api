const Movie = require('../models/movie');

const NotFound = require('../errors/NotFound');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequest = require('../errors/BadRequest');

// возвращает все сохранённые текущим  пользователем фильмы (GET /movies)
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// создаёт фильм с переданными в теле country, director, duration и др (POST /movies)
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id (DELETE /movies/_id )
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFound('Карточка с таким id не найдена');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нет прав на удаление карточки'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
