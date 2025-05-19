const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { sendFeedback, getFeedback, getFeedbackById } = require('../controllers/feedbackController');
const router = express.Router();

router.post('/feedback', authMiddleware, sendFeedback);
router.get('/all',authMiddleware, getFeedback);
router.get('/:id', authMiddleware, getFeedbackById);

module.exports = router;