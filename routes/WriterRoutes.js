// routes/writerRoutes.js
const express = require('express');
const router = express.Router();
const { getWriters, createWriter } = require('../Controllers/WriterConctroller');

// @route   GET /api/writers
router.get('/', getWriters);

// @route   POST /api/writers
router.post('/', createWriter);

module.exports = router;