const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a user
router.post('/', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  await newUser.save();
  const token = newUser.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: newUser._id,
    username: newUser.username,
    role: newUser.role
  });
});

// Get current user
router.get('/me', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findById(decoded._id).select('-password');
    res.send(user);
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
});

// Sign in a user
router.post('/signin', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Invalid username or password.');

  const validPassword = await user.validatePassword(req.body.password);
  if (!validPassword) return res.status(400).send('Invalid username or password.');

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    username: user.username,
    role: user.role
  });
});

module.exports = router;
