// routes/index.js
const express = require('express');
const router = express.Router();
const HomeRoutes = require('./HomeRoutes');
const AuthRoutes = require('./AuthRoutes');
const bookRoutes = require('./BookRoutes');
const categoryRoutes = require('./CategoryRoutes');
const subCategoryRoutes = require('./SubCategoryRoutes');
const writerRoutes = require('./WriterRoutes');
const importedCountryRoutes = require('./ImportedCountryRoutes');
const publisherRoutes = require('./PublisherRoutes');

// Use routes
router.use('/', HomeRoutes);
router.use('/auth', AuthRoutes);
router.use('/books', bookRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/writers', writerRoutes);
router.use('/imported-countries', importedCountryRoutes);
router.use('/publishers', publisherRoutes);

module.exports = router;