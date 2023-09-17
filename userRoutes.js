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
    role: req.body.role  // Make sure to get role from the request body
  });

  // Save the user and generate a token
  await newUser.save();
  const token = newUser.generateAuthToken();  // This method should be in your User model
  console.log("Generated Token:", token);
  console.log("Response Headers:", res.getHeaders());

  // Send the token in the response
  res.header('x-auth-token', token);
  console.log("Response Headers After Setting Token:", res.getHeaders());
  res.send({
    _id: newUser._id,
    username: newUser.username,
    role: newUser.role
  });

});

// Get current user
router.get('/me', async (req, res) => {
  const token = req.header('x-auth-token');
  console.log("Token:", token);  // Debugging line added here
  
  if (!token) return res.status(401).send('Access denied. No token provided.');
  
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');  
    console.log("Decoded:", decoded);  // Debugging line added here
    
    const user = await User.findById(decoded._id).select('-password');  // Exclude password from the result
    res.send(user);
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
});


module.exports = router;
