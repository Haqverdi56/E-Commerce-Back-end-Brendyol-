const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const commentModel = mongoose.model('Comment', commentSchema)

module.exports = commentModel;