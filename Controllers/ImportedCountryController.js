// controllers/importedCountryController.js
const ImportedCountry = require('../Models/ImportedCountry');

// @desc    Get all imported countries
// @route   GET /api/imported-countries
// @access  Public
const getImportedCountries = async (req, res) => {
  try {
    const importedCountries = await ImportedCountry.find();
    res.json(importedCountries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new imported country
// @route   POST /api/imported-countries
// @access  Private/Admin
const createImportedCountry = async (req, res) => {
  const { name, code } = req.body;

  try {
    const importedCountry = new ImportedCountry({
      name,
      code,
    });

    const createdImportedCountry = await importedCountry.save();
    res.status(201).json(createdImportedCountry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getImportedCountries,
  createImportedCountry,
};