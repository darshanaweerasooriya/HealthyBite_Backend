const mongoose = require('mongoose');
const MealType = require('../enums/enumList');

const MealPlanSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    date:{type:Date,required:true},
    meals:[{
        mealType:{type:Number,enum:Object.values(MealType)},
        recipeId:{type:mongoose.Schema.Types.ObjectId, ref:'Recipe'},
    }]
});

const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

module.exports = MealPlan;