// controllers/publisherController.js
const Publisher = require('../Models/Publisher');

// @desc    Get all publishers
// @route   GET /api/publishers
// @access  Public
const getPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new publisher
// @route   POST /api/publishers
// @access  Private/Admin
const createPublisher = async (req, res) => {
  const { name, address, contactEmail, phone } = req.body;

  try {
    const publisher = new Publisher({
      name,
      address,
      contactEmail,
      phone,
    });

    const createdPublisher = await publisher.save();
    res.status(201).json(createdPublisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPublishers,
  createPublisher,
};