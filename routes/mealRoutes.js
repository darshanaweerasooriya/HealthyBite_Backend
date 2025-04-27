const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { sugesstionRecipe } = require('../controllers/recipeSugesstionController');
const { createCustomMealPlan } = require('../controllers/customMealPlanController');
const router = express.Router();

router.get('/recipes/suggest',authMiddleware, sugesstionRecipe);
router.post('/mealplan/custom', authMiddleware,createCustomMealPlan);

module.exports = router;