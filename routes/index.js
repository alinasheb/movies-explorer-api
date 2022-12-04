const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const moviesRoutes = require('./moviesRoutes');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/usersControllers');
const { loginValidation, createUserValidation } = require('../middlewares/validations');

const NotFound = require('../errors/NotFound');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

router.use(auth);

router.use('/users', require('./moviesRoutes'));

router.use('/movies', require('./moviesRoutes'));

router.use(auth, usersRoutes);
router.use(auth, moviesRoutes);

router.use(() => {
  throw new NotFound('Ресурс не найден');
});

module.exports = router;
