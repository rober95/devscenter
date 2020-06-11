const asyncHandler = require('../middleware/async');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../config/keys.js');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

// @route   POST api/users/register
// @desc    Register
// @access  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    errors.email = 'Email already exists';
    return res.status(400).json(errors);
  }

  const avatar = gravatar.url(req.body.email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm', // default
  });

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    avatar,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  user = await newUser.save();

  res.status(201).json(user);
});

// @route   POST api/users/login
// @desc    Login User / Return JWT
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  const user = await User.findOne({ email });

  // Check for user
  if (!user) {
    errors.email = 'User not found';
    return res.status(404).json(errors);
  }

  // Check Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    errors.password = 'Password incorrect';
    return res.status(400).json(errors);
  }
  // User & Password matched

  // Create JWT Payload
  const payload = { id: user.id, name: user.name, avatar: user.avatar };

  // Sign token
  jwt.sign(payload, secretOrKey, { expiresIn: '6h' }, (err, token) => {
    res.json({ success: true, token: 'Bearer ' + token });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
exports.currentUser = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});
