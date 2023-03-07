const express = require('express');
const { productController } = require('../controller/productController');
const router = express.Router();


router.get('/', productController.getAllProducts);

router.post('/', productController.createProduct);

router.get('/:id', productController.getProductById);

// router.patch('/:id', productController.updateProduct);

// router.delete('/:id', productController.deleteProduct);

module.exports = router;