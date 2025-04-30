const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comments");

const addComment = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const {postId} = req.params;
        const {text} = req.body;

        const comment = new Comment({
            userId,
            postId,
            text
        });

        const savedComment = await comment.save();

        res.status(201).json({ message: 'Comment added', savedComment });
    } catch (error) {
        console.error('Failed to add comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const getComments = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ postId }).populate('userId', 'name email');

        res.status(200).json(comments);
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = { addComment, getComments };