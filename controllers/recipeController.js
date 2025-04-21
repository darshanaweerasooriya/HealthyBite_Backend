const asyncHandler = require("express-async-handler");
const Recipe = require("../models/Recipe");

const createRecipe = asyncHandler(async(req, res) =>{
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).json({message: 'Recipe created successfully', recipe: newRecipe});
    } catch (error) {
        console.error('Error creating recipe', error);
        res.status(500).json({ message: 'Failed to create recipe' });
    }
});

module.exports = {createRecipe};