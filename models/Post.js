const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    title:{type:String, required:true},
    content:{type:String, required:true},
    category:{type:String},
    createdAt:{type:Date, default:Date.now},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;