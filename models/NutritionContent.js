const mongoose = require('mongoose');

const nutritionContentSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String},
    mediaUrl:[String],
    category:{type:String},
    tags:[{type:String}],
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt:{type:Date, default: Date.now},
});

const NutritionContent = mongoose.model('NutritionContent', nutritionContentSchema);

module.exports = NutritionContent;