const mongoose = require('mongoose');

const UserHealthProgramSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    healthprogram: {
        type: mongoose.Types.ObjectId,
        ref: 'HealthProgram'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    reason: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('UserHProgram', UserHealthProgramSchema);