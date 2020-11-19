const mongoose = require('mongoose');


const timeSchema = {
    start: {
        type: String, 
        required: true
    },
    end: {
        type: String, 
        required: true
    }
}

const scheduleSchema = {
    day: {
        type: String
    },
    time: [timeSchema]   
}

const doctorSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        first: String,
        last: String,
    },
    specialization: {
        type: String,
        required: true
    },
    schedule: [scheduleSchema],
    avatar: {
        type: String,
    },
    department: {
        type: String,
        required: true
    }
}

module.exports = mongoose.model('Doctor', doctorSchema);