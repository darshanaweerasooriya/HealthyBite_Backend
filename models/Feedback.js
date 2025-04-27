const mongoose = require('mongoose');
const { rating } = require('../enums/enumList');

const FeedbackSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    message:{type:String, required: true},
    rating:{type:Number, enum:Object.values(rating), required: true},
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;