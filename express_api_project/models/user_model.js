const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: [true, 'A user with that email already exists'],
    lowercase: true,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Your account needs to be protected with a password'],
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
