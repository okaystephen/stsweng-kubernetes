const mongoose = require('mongoose');

const UserHealthProgramSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reason: {
        type: String,
        required: true
    },
    exposure: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('UserHProgram', UserHealthProgramSchema);