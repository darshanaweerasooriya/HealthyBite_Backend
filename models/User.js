const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    phonenumber: { type: String },  // Add this
   
});

const User = mongoose.model('User', UserSchema);

module.exports = User;


// fullName:{type:String},
//     username:{type:String, required:true},
//     email:{type:String},
//     password:{type:String, required:true},
//     mobile:{type:String},
//     dateOfBirth:{type:Date},
//     age:{type:Number},
//     gender:{type:String},
//     weight:{type:Number},
//     height:{type:Number},
//     profileImage:{type:String},
//     goals:[{
//         type:{type:String},
//         targetWeight:{type:Number},
//     }],
//     dietaryPreferences:[{type:String}]