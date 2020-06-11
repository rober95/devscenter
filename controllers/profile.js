const asyncHandler = require('../middleware/async');

// Load Validation
const validateProfileInput = require('../validation/profile');

// Load Profile & User Model
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
exports.currentUserProfile = asyncHandler(async (req, res, next) => {
  const errors = {};
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );
  if (!profile) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }
  res.json(profile);
});

// @route   POST api/profile
// @desc    Create / Update user profile
// @access  Private
exports.createUserProfile = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // Skills - Split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  let profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    // Update
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    res.json(profile);
  } else {
    // Create
    // Check if handle exists
    profile = await Profile.findOne({ handle: profileFields.handle });
    if (profile) {
      errors.handle = 'That handle already exists';
      return res.status(400).json(errors);
    }

    // Save profile
    profile = await new Profile(profileFields).save();
    res.json(profile);
  }
});
