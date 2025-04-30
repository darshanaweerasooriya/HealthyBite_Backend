const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { createPost, likePost, getAllPosts } = require('../controllers/postControllers');
const { addComment, getComments } = require('../controllers/commentController');
const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.put('/posts/:id/like', authMiddleware, likePost);
router.get('/',authMiddleware, getAllPosts);

//Add Comments
router.post('/comments/:postId',authMiddleware,addComment);
router.get('/comments/:postId',authMiddleware,getComments);

module.exports = router;