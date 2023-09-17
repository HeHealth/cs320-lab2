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

module.exports = mongoose.model('User', userSchema);

