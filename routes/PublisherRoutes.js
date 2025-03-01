// routes/publisherRoutes.js
const express = require('express');
const router = express.Router();
const { getPublishers, createPublisher } = require('../Controllers/PublisherController');

// @route   GET /api/publishers
router.get('/', getPublishers);

// @route   POST /api/publishers
router.post('/', createPublisher);

module.exports = router;