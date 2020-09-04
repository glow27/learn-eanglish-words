const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleID: String,
  vkID: String,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
