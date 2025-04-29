const asyncHandler = require("express-async-handler");
const ProgressLog = require("../models/ProgressLog");
const User = require("../models/User");

const addProgressLog = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const {weight,note} = req.body;

        if(!weight){
            return res.status(400).json({message: "Weight is required"});
        }

        const log = new ProgressLog({
            userId,
            weight,
            note
        });

        await log.save();
        await User.findByIdAndUpdate(userId, {weight});

        res.status(201).json({message: "Progress Log"});

    } catch (error) {
        console.error('Error logging progress:', error);
        res.status(500).json({message: "Internal Server Error"});

    }

});

const getProgressLog = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;

        const logs = await ProgressLog.find({userId}).sort({date: -1});

        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching progress logs:', error);
        res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = {addProgressLog, getProgressLog};