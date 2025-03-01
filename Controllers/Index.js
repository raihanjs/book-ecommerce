// controllers/index.js
const bookController = require('./BookController');
const writerController = require('./WriterConctroller');
const categoryController = require('./CategoryController');
const publisherController = require('./PublisherController');
const subCategoryController = require('./SubCategoryController');
const importedCountryController = require('./ImportedCountryController');

module.exports = {
  bookController,
  categoryController,
  subCategoryController,
  writerController,
  importedCountryController,
  publisherController,
};