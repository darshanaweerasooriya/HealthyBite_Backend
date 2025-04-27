const asyncHandler = require("express-async-handler");
const MealPlan = require("../models/MealPlan");

const createCustomMealPlan = asyncHandler(async (req, res) => {
   try {
    const userId = req.user.id;
    const {date, selectedMeals} = req.body;

    if(!selectedMeals || !Array.isArray(selectedMeals) || selectedMeals.length === 0){
        return res.status(400).json({message:'Selected meals are required'});
    }

    const mealPlan = new MealPlan({
        userId,
        date: date ? new Date(date) : new Date(),
        meals: selectedMeals
    });

    await mealPlan.save();
    res.status(201).json({message: 'Meal plan created successfully', mealPlan});
   } catch (error) {
    console.error('Error creating custom meal plan:', error);
    res.status(500).json({message:'Internal server error'});
   }


});

module.exports = { createCustomMealPlan };