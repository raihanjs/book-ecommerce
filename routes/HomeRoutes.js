// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getHome } = require('../Controllers/HomeController');

// @route   GET /api/categories
router.get('/', getHome);

module.exports = router;