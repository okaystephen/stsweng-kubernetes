const mongoose = require('mongoose');

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
    schedule: [{
        day: {type: String},
        time: [{
            start: {type: String, required: true},
            end: {type: String, required: true}
        }]
    }],
    avatar: {
        type: String,
    },
    department: {
        type: String,
        required: true
    }
}

module.exports = mongoose.model('Doctor', doctorSchema);