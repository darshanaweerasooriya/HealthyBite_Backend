const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

const createPost = asyncHandler(async (req, res) => {
   try {
    const userId = req.user.id;
    const {title,content,category} = req.body;

    const post = await Post.create({
        title,
        content,
        category,
        userId,
    });

    await post.save();
    res.status(201).json({message:"Post Created", post});
   } catch (error) {
     console.error('Failed to create post:', error);
        res.status(500).json({message:"Internal Server Error"});
   }

});

const likePost = asyncHandler(async (req, res) => {
   try {
    const {id} = req.params;
    const userId = req.user.id;

    const post = await Post.findById(id);
    if(!post){
        return res.status(404).json({message:"Post not found"});
    }

    if(post.likes.includes(userId)){
        post.likes.pull(userId);
    }
    else{
        post.likes.push(userId);
    }
    await post.save();
    res.status(200).json({message:"Post liked",likes:post.likes.length});
   } catch (error) {
    
   }


});

const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = {createPost,likePost,getAllPosts};