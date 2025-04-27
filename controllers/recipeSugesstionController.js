const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Recipe = require("../models/Recipe");

const sugesstionRecipe = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const {mealType} = req.query;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        //Build query
        const query = {}
        // if(user.dietaryPreferences.length > 0){
        //     query.tags = { $in: user.dietaryPreferences };
        // }
        if(mealType){
            query.mealType = parseInt(mealType);
        }

        const recipes = await Recipe.find(query).limit(10);

        res.status(200).json({message:'Recipe suggestions', recipes});
    } catch (error) {
        console.error('Error fetching recipe suggestions:', error);
        res.status(500).json({message:'Internal server error'});
    }
});

module.exports = {sugesstionRecipe};