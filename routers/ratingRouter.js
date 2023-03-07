const express = require('express');
const router = express.Router();
const { ratingController } = require('../controller/ratingController');

router.get('/', ratingController.getRates);
router.post('/', ratingController.createRate);

module.exports = router;