const asyncHandler = require('express-async-handler');
const FitnessAssetment = require('../models/FitnessAssementSchema');
const { json } = require('express');

const createAssessment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { age, height, weight, gender, target, dailyStatus, targetDate } = req.body;

  const dailyCalories = gender === 'Male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const protein = weight * 1.6;
  const water = weight * 35 / 1000;

  const result = { dailyCalories, protein, water };

  const assessment = new FitnessAssetment({
    userId,
    age,
    height,
    weight,
    gender,
    target,
    dailyStatus,
    targetDate,
    result
  });

  await assessment.save();
  res.status(201).json({ message: 'Assessment saved', result });
});

const getLatestAssetment = asyncHandler(async (req, res) => {
   const userId = req.user.id;
   
   const latest = await FitnessAssetment.findOne({userId}).sort({createdAt:-1});
   if(!latest){
    return res.status(404).json({message:'No assetment found'});
   }
   res.status(200).json({message:'Latest assetment',latest});
});

const getPlan = asyncHandler(async(req,res) =>{
    const userId = req.user.id;

    const assessment = await FitnessAssetment.findOne({userId}).sort({createdAt:-1});
    if(!assessment){
        return res.status(404).json({message:'No assetment found'});
    }

    if(req.query.type === 'diet'){
         const breakfast = [
      {
        title: 'Vegetable salad',
        calories: 100,
        protein: 5,
        fat: 3,
        carbs: 12,
        image: 'http://localhost:3001/images/salad1.jpg'
      },
      {
        title: 'Vegetable salad with egg',
        calories: 120,
        protein: 8,
        fat: 4,
        carbs: 10,
        image: 'http://localhost:3001/images/salad2.jpg'
      }
    ];

    const lunch = [
      {
        title: 'Chicken salad',
        calories: 250,
        protein: 22,
        fat: 10,
        carbs: 15,
        image: 'http://localhost:3001/images/chicken_salad.jpg'
      }
    ];

    const dinner = [
      {
        title: 'Grilled Fish with Vegetables',
        calories: 220,
        protein: 20,
        fat: 5,
        carbs: 8,
        image: 'http://localhost:3001/images/fish_dinner.jpg'
      }
    ];

    return res.json({
      type: 'diet',
      plan: {
        breakfast,
        lunch,
        dinner
      }
    });

  }  else if(req.query.type === 'exercise'){
        const plan = assessment.target === 'Body building'
        ?['Strength training 5x/week', 'Compound lifts', 'Progressive overload']
        :['HIIT 3x/week', 'Cardio + abs', 'Walking daily'];

        return res.json({type:'exercise',plan});
    }
    res.status(400),json({message:'Invalid type'});
}) 


module.exports = {createAssessment, getLatestAssetment, getPlan};