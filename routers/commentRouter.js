const express = require('express');
const router = express.Router();
const { commentController } = require("../controller/commentController")

router.get('/', commentController.getAllComments);
router.post('/', commentController.addComment);
  
module.exports = router