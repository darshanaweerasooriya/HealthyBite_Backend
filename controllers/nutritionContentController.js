const asyncHandler = require("express-async-handler");
const path = require('path');
const fs = require('fs');
const NutritionContent = require("../models/NutritionContent");

const uploadDir = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const serverBaseUrl = 'http://localhost:3001';

const createContent = asyncHandler(async (req, res) => {
    try {
        const{title,content,mediaUrl,category,tags} = req.body;

        if(!title){
            return res.status(400).json({message: "Title is required"});
        }

        let mediaFilesUrl = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const fileName = `contentMedia_${Date.now()}_${file.originalname}`;
                const filePath = path.join(uploadDir, fileName);

                // Write file to local storage
                fs.writeFileSync(filePath, file.buffer);

                // Save full URL path
                mediaFilesUrl.push(`${serverBaseUrl}/uploads/${fileName}`);
            }
        }

        const newContent  = new NutritionContent({
            title,
            content,
            mediaUrl: mediaFilesUrl,
            category,
            tags,
            author: req.user.id,
        });

        await newContent.save();
        res.status(201).json({message: "Nutrition content created successfully", newContent});

    } catch (error) {
        console.error('Error creating nutrition content:', error);
        res.status(500).json({message: "Internal Server Error"});
    }
});


const getAllContent = asyncHandler(async(req,res) =>{
    try {
        const contents = await NutritionContent.find().sort({createdAt: -1});
        res.status(200).json(contents);
    } catch (error) {
        console.error('Error displaying nutrition content:', error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

const getContentById = asyncHandler(async(req,res) =>{
    try {
        const content = await NutritionContent.findById(req.params.id);

        if(!content){
            return res.status(404).json({message: "Content not found"});
        }

        res.status(200).json(content);
    } catch (error) {
        console.error('Error displaying nutrition content by ID:', error);
        res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = { createContent, getAllContent, getContentById };