const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, default: 'user', required: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
  profilePhoto: {type: String, default: null}
});

module.exports = mongoose.model('User', UserSchema);