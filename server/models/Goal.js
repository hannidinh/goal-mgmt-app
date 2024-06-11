const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend',
    }
})

module.exports = mongoose.model('Goal', GoalSchema);