const asyncHandler = require("express-async-handler");
const Professional = require("../models/Professional");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const Appointment = require("../models/Appointments");
const { appointmentStatus } = require("../enums/enumList");

const uploadDir = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const serverBaseUrl = 'http://localhost:3001';

const createProfessionalAccount = asyncHandler(async (req, res) => {
    try {
        const {name,username,password,email,type,bio,specialization,profileImage,experience,avaialability} = req.body;

        if(!name || !email || !type){
            return res.status(400).json({message:"Please name,email and type fields"});
        }

        const professionalExists = await Professional.findOne({username});
        if(professionalExists){
            return res.status(400).json({message:"Professional already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

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
            username,
            password:hashPassword,
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

const professionalLogin = asyncHandler(async (req, res) => {
    
    const {username, password} = req.body;
    const JWT_SECRECT = 'manuss' 
    try {
        const user = await Professional.findOne({username});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:'Invalid Password'});
        }

        const token = jwt.sign({id:user._id.toString()},JWT_SECRECT,{expiresIn:'1h'});
        res.status(200).json({token, user});
    } catch (error) {
        console.log('Error during login', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const getAvailableSlots = asyncHandler(async(req,res) =>{
    try {
        const { id } = req.params;
        const { date } = req.query;

        const professional = await Professional.findById(id);
        if(!professional){
            return res.status(404).json({message:"Professional not found"});
        }

        const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        const avaialability = professional.avaialability.find(availability => availability.day === dayName);
        if(!avaialability) return res.status(200).json({avaialability: []});

        const booked = await Appointment.find({ professionalId: id, date: date, status:{$ne: appointmentStatus.Cancelled} })
        .select('time');

        const bookedTimes = booked.map(a => a.time);
        const openSlots = avaialability.timeSlots.filter(slot => !bookedTimes.includes(slot));

        res.status(200).json({avaialability: openSlots});
    } catch (error) {
        console.error("Error getting available slots:", error);
        res.status(500).json({message:"Internal Server Error"});
    }

})


module.exports = { createProfessionalAccount,professionalLogin,getAvailableSlots };