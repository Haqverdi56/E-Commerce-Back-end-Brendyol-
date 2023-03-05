const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const productSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  thumbnail: {
    type: String,
    required: true, 
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  stock: Number,
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  rating: {
    type: Number,
    default: 4,
    min: 0,
    max: 5,
  },
});

// const productModel = mongoose.model("Product", productSchema);

module.exports = mongoose.model("Product", productSchema);