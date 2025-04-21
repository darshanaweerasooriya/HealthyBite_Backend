const express = require('express');
const { createRecipe } = require('../controllers/recipeController');
const router = express.Router();

router.post('/create',createRecipe);

module.exports = router;