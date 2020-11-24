const mongoose = require('mongoose');

const HealthProgramSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hp_name: {
        type: String,
        required: true,
    },
    hp_desc: {
        type: String,
        required: true,
    },
    hp_location: {
        type: String,
        required: true,
    },
    hp_startdate: {
        type: Date,
        required: true,
    },
    hp_enddate: {
        type: Date,
        required: true,
    },
    hp_curCap: {
        type: Number,
        default: 0,
    },
    hp_maxCap: {
        type: Number,
        default: 0,
        required: true,
    },
});

module.exports = mongoose.model('HealthProgram', HealthProgramSchema);