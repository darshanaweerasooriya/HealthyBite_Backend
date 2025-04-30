const mongoose = require('mongoose');
const { appointmentStatus } = require('../enums/enumList');

const appointmentSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    professionalId:{type:mongoose.Schema.Types.ObjectId, ref:'Professional', required:true},
    date:{type:Date, required:true},
    time:{type:String, required:true},
    status:{type:String, enum:Object.values(appointmentStatus), default:appointmentStatus.Pending},
    notes:{type:String},
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;