const express = require('express');
const router = express.Router();
const { userController } = require('../controller/userController');

router.get('/', userController.getUsers);
router.post('/login', userController.login);
router.post('/', userController.confirmCode);

module.exports = router;