const mongoose = require('mongoose');
const { Schema } = mongoose; 

const ratingSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ratingModel = mongoose.model('Rating', ratingSchema);

module.exports = ratingModel;