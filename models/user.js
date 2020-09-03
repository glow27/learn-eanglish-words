const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleID: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
});

module.exports = mongoose.model('User', userSchema);
