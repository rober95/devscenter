const express = require('express');
const router = express.Router();
const passport = require('passport');

const { currentUserProfile } = require('../../controllers/profile');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  currentUserProfile
);

module.exports = router;
