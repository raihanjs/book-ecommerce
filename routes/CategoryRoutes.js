// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getCategories,getCategoryById, createCategory } = require('../Controllers/CategoryController');

// @route   GET /api/categories
router.get('/', getCategories);

// @route   GET /api/categories/id
router.get('/:id', getCategoryById);

// @route   POST /api/categories
router.post('/', createCategory);

module.exports = router;