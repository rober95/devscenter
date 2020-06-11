import express from 'express';
import { registerUser, login } from '../../controllers/users.js';
export const router = express.Router();

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.post('/register', registerUser);
router.post('/login', login);
