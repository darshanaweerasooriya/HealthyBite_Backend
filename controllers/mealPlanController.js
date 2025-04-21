const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const MealPlan = require('../models/MealPlan');
const MealType = require('../enums/enumList');

const generateMealPlan = asyncHandler(async(req,res) =>{
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Estimate daily caloric needs using Mifflin-St Jeor Equation
        let bmr;
        if(user.gender === 'male'){
            bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
        }
        else{
            bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
        }

        const goal = user.goals[0]?.type || 'maintenance'; // Default to 'maintain' if no goal is set
        if(goal == 'weight loss'){
            bmr -= 500;
        }
        if(goal == 'weight gain'){
            bmr += 500;
        }

        const caloriesPerMeal = {
            breakfast: bmr * 0.25,
            lunch: bmr * 0.35,
            dinner: bmr * 0.3,
            snacks: bmr * 0.1
        };

        const mealPlan = [];
        for(const mealType of ['breakfast', 'lunch', 'dinner', 'snacks']){
            const query = {
                mealType: MealType[mealType],
                tags:{$in: user.dietaryPreferences || []},
                calories: { $lte: caloriesPerMeal[mealType]  + 50}
            };
            const recipes = await Recipe.find(query).limit(10);
            if(recipes.length > 0){
                const randomIndex = Math.floor(Math.random() * recipes.length);
                mealPlan.push({
                    mealType: mealType,
                    recipe: recipes[randomIndex]._id
                });
            }

            const savePlan = await MealPlan.create({
                userId: userId,
                date: new Date(),
                meals: mealPlan
            });

            res.status(200).json({message:'Meal Plan created',savePlan});
        }
    } catch (error) {
        console.error('Error generating meal plan', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {generateMealPlan};