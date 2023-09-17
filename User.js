const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['employer', 'employee'],
    required: true
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, role: this.role }, 'your_jwt_secret_key');
  return token;
};

userSchema.methods.validatePassword = async function(inputPassword) {
  // For demonstration purposes, a simple equality check is used.
  // In a real-world application, you should use hashed passwords.
  return this.password === inputPassword;
};

module.exports = mongoose.model('User', userSchema);

