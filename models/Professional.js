const mongoose = require('mongoose');

const { professionalType } = require('../enums/enumList');

const ProfessionalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phonenumb: { type: String, required: true },
    type: { type: Number, enum: Object.values(professionalType), required: true },

    age: { type: Number },                    // ✅ New
    height: { type: Number },                 // ✅ New
    weight: { type: Number },                 // ✅ New
    gender: { type: String, enum: ['Male', 'Female'] }, // ✅ New
    goals: [{ type: String }],               // ✅ New - selectedTargets
    qualification: { type: String },         // ✅ New - targetDateController
    bio: { type: String },                   // Existing - mapped to "About"

    specialization: { type: String },
    profileImage: { type: String },
    experience: { type: Number },
    avaialability: [{ day: String, timeSlots: [String] }],
});

const Professional = mongoose.model('Professional', ProfessionalSchema);
module.exports = Professional;