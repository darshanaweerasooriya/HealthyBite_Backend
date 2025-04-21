const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { generateMealPlan } = require('../controllers/mealPlanController');
const router = express.Router();

router.post('/generate',authMiddleware,generateMealPlan);

module.exports = router;