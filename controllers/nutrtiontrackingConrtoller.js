const asyncHandler = require("express-async-handler");
const NutritionsTracking = require("../models/NutritionTracking");

const addNutritionTracking = asyncHandler(async (req, res) => {
    try {
        const {mealType, foodName, calories, protein, carbs, fats} = req.body;

        const entry = await NutritionsTracking.create({
            userId: req.user.id,
            date: new Date(),
            mealType,
            foodName,
            calories,
            protein,
            carbs,
            fats
        });

        res.status(201).json({message:'Nutrition entry added',entry});
    } catch (error) {
        console.error('Error adding nutrition entry:', error);
        res.status(500).json({message:'Internal server error'});
    }
});

const getDailyNutriotionSummary = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    let { date } = req.query;
  
    // Use today if not provided
    if (!date || typeof date !== 'string') {
      const today = new Date();
      date = today.toISOString().split('T')[0]; // e.g. '2025-04-21'
    }
  
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
  
      const start = new Date(parsedDate.setHours(0, 0, 0, 0));
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
  
      const logs = await NutritionsTracking.find({
        userId,
        date: { $gte: start, $lt: end }
      });
  
      const summary = logs.reduce((acc, log) => {
        acc.calories += log.calories || 0;
        acc.protein += log.protein || 0;
        acc.carbs += log.carbs || 0;
        acc.fat += log.fat || 0;
        return acc;
      }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  
      res.status(200).json({ date, summary });
    } catch (error) {
      console.error('Error fetching summary:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = {addNutritionTracking, getDailyNutriotionSummary};