// models/Writer.js
const mongoose = require('mongoose');

const WriterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
});

module.exports = mongoose.model('Writer', WriterSchema);