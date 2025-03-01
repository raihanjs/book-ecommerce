// models/index.js
const Book = require('./Book');
const Category = require('./Category');
const SubCategory = require('./SubCategory');
const Writer = require('./Writer');
const ImportedCountry = require('./ImportedCountry');
const Publisher = require('./Publisher');

module.exports = {
  Book,
  Category,
  SubCategory,
  Writer,
  ImportedCountry,
  Publisher,
};