const express = require('express');
const {
  registerUser,
  login,
  currentUser,
} = require('../../controllers/users.js');
const passport = require('passport');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  currentUser
);

module.exports = router;
