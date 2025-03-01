// controllers/bookController.js
const Book = require('../Models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
// GET books?page=1&limit=5
// GET books?keyword=harry&page=1&limit=5
// GET books?sort=name&order=asc&page=1&limit=5
// GET books?sort=price&order=desc&page=1&limit=5
// GET books?keyword=harry&sort=price&order=asc&page=1&limit=5
const getBooks = async (req, res) => {
  const { page = 1, limit = 5, keyword, sort, order } = req.query;
  let query = {};
  let sortOptions = {};

  // Search by keyword
  if (keyword) {
    query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    };
  }

  // Sorting
  if (sort === 'name') {
    sortOptions.title = order === 'desc' ? -1 : 1;
  } else if (sort === 'price') {
    sortOptions.price = order === 'desc' ? -1 : 1;
  }


  try {
    const books = await Book.find(query)
      .populate('category subCategory writer importedCountry publisher')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments(query);
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
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