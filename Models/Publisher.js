// models/Publisher.js
const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String },
  contactEmail: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model('Publisher', PublisherSchema);