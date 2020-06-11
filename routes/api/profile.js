const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  currentUserProfile,
  createUserProfile,
  getProfileByHandle,
  getProfileById,
  getAllProfiles,
} = require('../../controllers/profile');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), currentUserProfile)
  .post(passport.authenticate('jwt', { session: false }), createUserProfile);

router.get('/handle/:handle', getProfileByHandle);

router.get('/user/:user_id', getProfileById);

router.get('/all', getAllProfiles);

module.exports = router;
