const mongoose = require('mongoose');
const MealType = require('../enums/enumList');

const nutritionTrackingSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date:{type:Date, required: true},
    mealType:{type:Number, enum:Object.values(MealType), required: true},
    foodName:{type:String, required: true},
    calories:{type:Number},
    protein:{type:Number},
    carbs:{type:Number},
    fats:{type:Number},
});

const NutritionsTracking = mongoose.model('NutritionTracking', nutritionTrackingSchema);

module.exports = NutritionsTracking;