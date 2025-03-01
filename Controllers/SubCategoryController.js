// controllers/subCategoryController.js
const SubCategory = require('../Models/SubCategory.js');

// @desc    Get all subcategories
// @route   GET /api/subcategories
// @access  Public
const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate('category');
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate('category');
      if (!subCategory) {
        return res.status(404).json({ message: 'Sub Category not found' });
      }
      res.json(subCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new subcategory
// @route   POST /api/subcategories
// @access  Private/Admin
const createSubCategory = async (req, res) => {
  const { name, description, category } = req.body;

  try {
    const subCategory = new SubCategory({
      name,
      description,
      category,
    });

    const createdSubCategory = await subCategory.save();
    res.status(201).json(createdSubCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSubCategories,
  getSubCategoryById,
  createSubCategory,
};