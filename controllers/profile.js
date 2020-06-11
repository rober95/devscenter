const asyncHandler = require('../middleware/async');

// Load Validation
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

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

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  const errors = {};

  const profiles = await Profile.find().populate('user', ['name', 'avatar']);

  if (!profiles) {
    errors.noprofile = 'There are no profiles';
    return res.status(404).json(errors);
  }

  res.json(profiles);
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
exports.getProfileByHandle = asyncHandler(async (req, res, next) => {
  const errors = {};

  const profile = await Profile.findOne({
    handle: req.params.handle,
  }).populate('user', ['name', 'avatar']);

  if (!profile) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }

  res.json(profile);
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
exports.getProfileById = asyncHandler(async (req, res, next) => {
  const errors = {};

  const profile = await Profile.findOne({
    user: req.params.user_id,
  }).populate('user', ['name', 'avatar']);

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

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
exports.addExperience = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }

  const newExp = {
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description,
  };

  // Add to exp array
  profile.experience.unshift(newExp);

  profile = await profile.save();

  res.json(profile);
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
exports.addEducation = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateEducationInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }

  const newEdu = {
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description,
  };

  // Add to exp array
  profile.education.unshift(newEdu);

  profile = await profile.save();

  res.json(profile);
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
exports.deleteExperience = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }

  // Get remove index
  const removeIndex = profile.experience
    .map(item => item.id)
    .indexOf(req.params.exp_id);

  // Splice out of array
  profile.experience.splice(removeIndex, 1);

  profile = await profile.save();

  res.json(profile);
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
exports.deleteEducation = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }

  // Get remove index
  const removeIndex = profile.education
    .map(item => item.id)
    .indexOf(req.params.edu_id);

  // Splice out of array
  profile.education.splice(removeIndex, 1);

  profile = await profile.save();

  res.json(profile);
});

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOneAndDelete({ user: req.user.id });

  if (!profile) {
    errors.noprofile = 'There is no profile for this user';
    return res.status(404).json(errors);
  }

  await User.findOneAndDelete({ _id: req.user.id });

  res.json({ success: true });
});
