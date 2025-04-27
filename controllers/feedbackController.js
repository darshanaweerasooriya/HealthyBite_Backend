const asyncHandler = require("express-async-handler");
const Feedback = require("../models/Feedback");

const sendFeedback = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { message, rating } = req.body;

        if(!message || !rating) {
            return res.status(400).json({ message: 'Message and rating are required' });
        }

        const feedback = new Feedback({
            userId,
            message,
            rating
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback sent successfully', feedback });
    } catch (error) {
        console.error('Error sending feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { sendFeedback };