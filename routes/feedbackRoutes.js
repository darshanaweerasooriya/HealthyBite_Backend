const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { sendFeedback } = require('../controllers/feedbackController');
const router = express.Router();

router.post('/', authMiddleware, sendFeedback);

module.exports = router;