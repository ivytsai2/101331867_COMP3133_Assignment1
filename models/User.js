const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter first name'],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    lowercase: true,
    //Custom validation
    validate: [function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }, 'Please enter a valid email']
  },
  password: {
    type: String,
    maxLength: 60,
    required: true,
    trim: true
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;