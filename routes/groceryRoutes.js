const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { generateGroceryList } = require('../controllers/groceryController');
const router = express.Router();

router.get('/groceryList', authMiddleware, generateGroceryList);

module.exports = router;