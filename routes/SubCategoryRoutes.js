// routes/subCategoryRoutes.js
const express = require('express');
const router = express.Router();
const { getSubCategories, createSubCategory, getSubCategoryById } = require('../Controllers/SubCategoryController');

// @route   GET /api/subcategories
router.get('/', getSubCategories);

// @route   GET /api/subcategories
router.get('/:id', getSubCategoryById);

// @route   POST /api/subcategories
router.post('/', createSubCategory);

module.exports = router;