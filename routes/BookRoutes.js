// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Middleware/AuthMiddleware');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../Controllers/BookController');

// @route   GET /api/books
router.get('/', getBooks);

// @route   GET /api/books/:id
router.get('/:id', getBookById);

// @route   POST /api/books
router.post('/', authMiddleware ,createBook);

// @route   PUT /api/books/:id
router.put('/:id', updateBook);

// @route   DELETE /api/books/:id
router.delete('/:id', deleteBook);

module.exports = router;
