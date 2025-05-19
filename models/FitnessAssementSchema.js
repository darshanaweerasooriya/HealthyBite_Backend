const mongoose = require('mongoose');
const { genderList, targetList } = require('../enums/enumList');

const FitnessAssementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  gender: { type: String, enum: Object.values(genderList), required: true },
  target: { type: String, enum: Object.values(targetList), required: true },
  dailyStatus: { type: String },
  targetDate: { type: Date },
  result: {
    dailyCalories: { type: Number },
    protein: { type: Number },
    water: { type: Number }
  }
}, { timestamps: true });

const FitnessAssetment = mongoose.model('FitnessAssetment', FitnessAssementSchema);

module.exports = FitnessAssetment;
