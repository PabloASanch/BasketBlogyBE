const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  pfp: {
    type: String,
  }
}, 
{
  collection : "users"
});

const User = mongoose.model("User", userSchema);

module.exports = User;
