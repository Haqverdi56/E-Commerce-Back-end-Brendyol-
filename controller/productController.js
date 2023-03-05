const Product = require("../models/ProductModel");

const productController = {
  getAllProducts: async (req, res) => {
    // console.log("getAll");
    try {
      const products = await Product.find().populate('category').exec();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createProduct: async (req, res) => {
    const product = new Product({
      title: req.body.title,
      brand: req?.body?.brand,
      description: req.body.description,
      price: req.body.price,
      images: req.body.images,
      thumbnail: req.body.thumbnail,
      category: req.body.category,
      stock: req.body.stock,
      tags: req.body.tags,
      comments: req.body.comments,
      rating: req.body.rating,
    });
    
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  // getProductById: async (req, res, next) => {
  //   let product;
  //   try {
  //     product = await Product.findById(req.params.id)
  //       .populate("categories")
  //       .populate("comments");
  //     if (product == null) {
  //       return res.status(404).json({ message: "Ürün bulunamadı." });
  //     }
  //   } catch (err) {
  //     return res.status(500).json({ message: err.message });
  //   }
  //   res.product = product;
  //   next();
  // },
  // updateProduct: async (req, res) => {
  //   if (req.body.name != null) {
  //     res.product.name = req.body.name;
  //   }
  //   if (req.body.description != null) {
  //     res.product.description = req.body.description;
  //   }
  //   if (req.body.price != null) {
  //     res.product.price = req.body.price;
  //   }
  //   if (req.body.images != null) {
  //     res.product.images = req.body.images;
  //   }
  //   if (req.body.categories != null) {
  //     res.product.categories = req.body.categories;
  //   }
  //   if (req.body.tags != null) {
  //     res.product.tags = req.body.tags;
  //   }
  //   try {
  //     const updatedProduct = await res.product.save();
  //     res.json(updatedProduct);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
  // deleteProduct: async (req, res) => {
  //   try {
  //     await res.product.remove();
  //     res.json({ message: "Product deleted" });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
};

module.exports = {
  productController,
};
