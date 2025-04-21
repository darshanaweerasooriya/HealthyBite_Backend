const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName:{type:String, required:true},
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    mobile:{type:String, required:true},
    dateOfBirth:{type:Date, required:true},
    age:{type:Number, required:true},
    gender:{type:String, required:true},
    weight:{type:Number, required:true},
    height:{type:Number, required:true},
    profileImage:{type:String},
    goals:[{
        type:{type:String, required:true},
        targetWeight:{type:Number, required:true},
    }],
    dietaryPreferences:[{type:String}]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;