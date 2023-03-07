const Category = require("../models/CategoryModel");

const categoryController = {
    getCategories: async (req, res) => {
    console.log("Categoories");

    try {
      const categories = await Category.find().populate('parent').populate('children').exec();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createCategory: async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
        parent: req?.body?.parent,
        children: req.body.children,
        products: req.body.products
      });
    
      try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
      } catch (error) {
        res.status(500).json({message: error.message})
      }
  },
};

module.exports = {
  categoryController,
};
