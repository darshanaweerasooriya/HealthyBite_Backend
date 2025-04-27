const asyncHandler = require("express-async-handler");
const MealPlan = require("../models/MealPlan");
const Recipe = require("../models/Recipe");

const generateGroceryList = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: 'Date is required' });
        }

        const start = new Date(date).toISOString();
        const end = new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toISOString();
        

        const mealPlans = await MealPlan.find({
            userId,
            date: { $gte: start, $lt: end }
        });
        

        if (!mealPlans || mealPlans.length === 0) {
            return res.status(404).json({ message: 'No meal plans found for this date' });
        }

        let recipeIds = [];
        mealPlans.forEach(plan => {
            if (plan.meals && plan.meals.length > 0) {
                plan.meals.forEach(meal => {
                    // Use meal.recipeId instead of meal.recipe
                    if (meal.recipeId) {
                        recipeIds.push(meal.recipeId);
                    }
                });
            }
        });
        
        // Query for recipes based on the collected recipeIds
        const recipes = await Recipe.find({ _id: { $in: recipeIds } });
       
        // Collect all ingredients from the recipes
        let groceryItems = [];
        recipes.forEach(recipe => {
            if (recipe.ingredients) {
                groceryItems = groceryItems.concat(recipe.ingredients);
            }
        });
       
        
        // Remove duplicates
        const uniqueGroceryItems = [...new Set(groceryItems)];
        res.status(200).json({ date, groceryList: uniqueGroceryItems });
    } catch (error) {
        console.error('Error generating grocery list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { generateGroceryList };
