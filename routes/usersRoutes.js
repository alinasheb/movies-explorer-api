const router = require('express').Router();
const {
  updateUserValidation,
} = require('../middlewares/validations');

const {
  getUserMe,
  updateUser,
} = require('../controllers/usersControllers');

router.get('/users/me', getUserMe);
router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;
