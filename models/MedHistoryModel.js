const mongoose = require('mongoose');

const MedHistorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    problems: {
        type: [String],
        required: true,
    },
    surgeries: {
        type: [String],
        required: true,
    },
    medications: {
        type: [String],
        required: true,
    },
    medallergic: {
        type: [String],
        required: true,
    }
})

module.exports = mongoose.model('MedHistory', MedHistorySchema);