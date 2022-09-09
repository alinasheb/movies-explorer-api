const router = require('express').Router();
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validations');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/moviesControllers');

router.get('/movies/', getMovies);
router.post('/movies/', createMovieValidation, createMovie);
router.delete('/movies/:_id', deleteMovieValidation, deleteMovie);

module.exports = router;
