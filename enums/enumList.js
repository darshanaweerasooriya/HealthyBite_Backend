const MealType = Object.freeze({
    Breakfast: 1,
    Lunch: 2,
    Dinner: 3,
    Snack: 4,
  });

  const rating = Object.freeze({
    OneStar: 1,
    TwoStar: 2,
    ThreeStar: 3,
    FourStar: 4,
    FiveStar: 5,
  });

  const professionalType = Object.freeze({
    Dietitian: 1,
    FitnessCoach: 2,
  
  });

  const appointmentStatus = Object.freeze({
    Pending: 1,
    Confirmed: 2,
    Cancelled: 3,
    
  });

  const genderList = Object.freeze({
    Male:'Male',
    Female:'Female'
  });

  const targetList = Object.freeze({
    BodyBuilding:'Body building',
    WeightLoss:'Weight loss'
  })

  module.exports = {MealType,rating,professionalType,appointmentStatus,genderList,targetList};