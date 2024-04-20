const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type:String,
    default:"https://en.wikipedia.org/wiki/Akshay_Kumar#/media/File:Akshay_Kumar.jpg"
  },
});



// Create the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
