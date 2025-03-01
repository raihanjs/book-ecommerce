// models/ImportedCountry.js
const mongoose = require('mongoose');

const ImportedCountrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('ImportedCountry', ImportedCountrySchema, 'importedCountries');