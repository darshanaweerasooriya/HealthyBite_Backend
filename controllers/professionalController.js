const asyncHandler = require("express-async-handler");
const Professional = require("../models/Professional");
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const serverBaseUrl = 'http://localhost:3001';

const createProfessionalAccount = asyncHandler(async (req, res) => {
    try {
        const {name,email,type,bio,specialization,profileImage,experience,avaialability} = req.body;

        if(!name || !email || !type){
            return res.status(400).json({message:"Please name,email and type fields"});
        }

        const professionalExists = await Professional.findOne({email});
        if(professionalExists){
            return res.status(400).json({message:"Professional already exists"});
        }

        let profileImageUrl = "";
                
                 if (req.file) {
                    const fileName = `profile_${Date.now()}_${req.file.originalname}`;
                    const filePath = path.join(uploadDir, fileName);
        
                    // Save file to local storage
                    fs.writeFileSync(filePath, req.file.buffer);
        
                    // Set profile image URL for retrieval
                    profileImageUrl = `${serverBaseUrl}/uploads/${fileName}`;
                }

                let parsedAvailability = avaialability;
                if (typeof avaialability === 'string') {
                    parsedAvailability = JSON.parse(avaialability);
                }

        
        const professional = new Professional({
            name,
            email,
            type,
            bio,
            specialization,
            profileImage: profileImageUrl,
            experience,
            avaialability: parsedAvailability,
        });

        await professional.save();
        res.status(201).json({message:"Professional account created successfully",professional});
    } catch (error) {
        console.error("Error creating professional account:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

module.exports = { createProfessionalAccount };