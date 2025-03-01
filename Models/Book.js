// models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Writer', required: true },
  importedCountry: { type: mongoose.Schema.Types.ObjectId, ref: 'ImportedCountry', required: true },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
  stock: { type: Number, default: 0 },
  publishedDate: { type: Date, default: Date.now },
  coverImage: { type: String, required: true },
});

module.exports = mongoose.model('Book', BookSchema);