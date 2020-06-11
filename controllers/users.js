import asyncHandler from '../middleware/async.js';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secretOrKey } from '../config/keys.js';

import User from '../models/User.js';

// @route   POST api/users/register
// @desc    Register
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ email: 'Email already exists' });
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
export const login = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  const user = await User.findOne({ email });

  // Check for user
  if (!user) {
    return res.status(404).json({ email: 'User not found' });
  }

  // Check Password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ password: 'Password incorrect' });
  }
  // User & Password matched

  // Create JWT Payload
  const payload = { id: user.id, name: user.name, avatar: user.avatar };

  // Sign token
  jwt.sign(payload, secretOrKey, { expiresIn: '6h' }, (err, token) => {
    res.json({ success: true, token: 'Bearer ' + token });
  });
});
