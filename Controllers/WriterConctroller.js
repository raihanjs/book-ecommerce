// controllers/writerController.js
const Writer = require('../models/Writer');

// @desc    Get all writers
// @route   GET /api/writers
// @access  Public
const getWriters = async (req, res) => {
  try {
    const writers = await Writer.find();
    res.json(writers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new writer
// @route   POST /api/writers
// @access  Private/Admin
const createWriter = async (req, res) => {
  const { name, bio, nationality } = req.body;

  try {
    const writer = new Writer({
      name,
      bio,
      nationality,
    });

    const createdWriter = await writer.save();
    res.status(201).json(createdWriter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getWriters,
  createWriter,
};