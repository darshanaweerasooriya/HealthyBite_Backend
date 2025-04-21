const mongoose = require('mongoose');
const MealType = require('../enums/enumList');

const RecipeSchema = new mongoose.Schema({
    title: { type: String },
    ingredients: [{ type: String }],
    instructions: { type: String },
    tags: [{ type: String }],
    calories: { type: Number },
    macros:{
        protein: { type: Number },
        carbs: { type: Number },
        fats: { type: Number }
    },
    mealType:{type:Number, enum:Object.values(MealType)},
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;