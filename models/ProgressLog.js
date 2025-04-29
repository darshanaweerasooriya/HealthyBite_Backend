const mongoose = require('mongoose');

const progressLogSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date:{type: Date, default: Date.now},
    weight:{type: Number, required: true},
    note:{type: String, required: true},
});

const ProgressLog = mongoose.model('ProgressLog', progressLogSchema);

module.exports = ProgressLog;