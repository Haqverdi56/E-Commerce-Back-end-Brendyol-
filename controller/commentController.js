const Comment = require("../models/CommentModel");

const commentController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find({});
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addComment: async (req, res) => {
    // const productId = req.body.productId
    const comment = new Comment({
      text: req.body.text
    });
  
    try {
      const newComment = await comment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};


module.exports = {
    commentController
}