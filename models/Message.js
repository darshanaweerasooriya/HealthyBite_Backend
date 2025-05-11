const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    text:{type:String, required:true},
    timestamp:{type:Date, default:Date.now},
    read:{type:Boolean, default:false}
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;