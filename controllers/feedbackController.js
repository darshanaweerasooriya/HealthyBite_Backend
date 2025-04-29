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

const getFeedback = asyncHandler(async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('userId', 'username email');
        res.status(200).json({feedbacks});

    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const getFeedbackById = asyncHandler(async(req,res) =>{
    try {
        const {id} = req.params;
        const feedback = await Feedback.findById(id).populate('userId', 'username email');
        if(!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json({feedback});
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = { sendFeedback,getFeedback,getFeedbackById };