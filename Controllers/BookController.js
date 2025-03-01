// controllers/bookController.js
const Book = require('../Models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('category subCategory writer importedCountry publisher');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category subCategory writer importedCountry publisher');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  const { title, description, price, category, subCategory, writer, importedCountry, publisher, stock, coverImage } = req.body;

  try {
    const book = new Book({
      title,
      description,
      price,
      category,
      subCategory,
      writer,
      importedCountry,
      publisher,
      stock,
      coverImage,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  const { title, description, price, category, subCategory, writer, importedCountry, publisher, stock, coverImage } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
      book.description = description || book.description;
      book.price = price || book.price;
      book.category = category || book.category;
      book.subCategory = subCategory || book.subCategory;
      book.writer = writer || book.writer;
      book.importedCountry = importedCountry || book.importedCountry;
      book.publisher = publisher || book.publisher;
      book.stock = stock || book.stock;
      book.coverImage = coverImage || book.coverImage;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await book.remove();
      res.json({ message: 'Book removed' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};