const asyncHandler = require('../middleware/async');

// Load Profile & User Model
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
exports.currentUserProfile = asyncHandler(async (req, res, next) => {
  // const { errors, isValid } = validateRegisterInput(req.body);
  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const errors = {};
  const profile = await Profile.findOne({ user: req.user.id });
  if (!profile) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }
  res.json(profile);
});
