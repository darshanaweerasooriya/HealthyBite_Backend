const mongoose = require('mongoose');
const { professionalType } = require('../enums/enumList');

const ProfessionalSchema = new mongoose.Schema({
    name:{type: String, required: true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type: String, required: true},
    type:{type:Number, enum:Object.values(professionalType), required:true},
    bio:{type:String},
    specialization:{type:String},
    profileImage:{type:String},
    experience:{type:Number},
    avaialability:[{day: String, timeSlots: [String]}],
});

const Professional = mongoose.model('Professional', ProfessionalSchema);

module.exports = Professional;