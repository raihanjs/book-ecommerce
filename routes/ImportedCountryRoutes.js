// routes/importedCountryRoutes.js
const express = require('express');
const router = express.Router();
const { getImportedCountries, createImportedCountry } = require('../Controllers/ImportedCountryController');

// @route   GET /api/imported-countries
router.get('/', getImportedCountries);

// @route   POST /api/imported-countries
router.post('/', createImportedCountry);

module.exports = router;