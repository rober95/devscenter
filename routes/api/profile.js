const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  currentUserProfile,
  createUserProfile,
  getProfileByHandle,
  getProfileById,
  getAllProfiles,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  deleteProfile,
} = require('../../controllers/profile');

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), currentUserProfile)
  .post(passport.authenticate('jwt', { session: false }), createUserProfile)
  .delete(passport.authenticate('jwt', { session: false }), deleteProfile);

router.get('/handle/:handle', getProfileByHandle);

router.get('/user/:user_id', getProfileById);

router.get('/all', getAllProfiles);

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  addExperience
);

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  deleteExperience
);

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  addEducation
);

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  deleteEducation
);

module.exports = router;
