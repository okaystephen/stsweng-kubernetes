const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        first: String,
        middle: String,
        last: String,
    },
    relationship: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    eContactPerson: {
        type: String,
        required: true
    },
    eContactNum: {
        type: String,
        required: true,
    },
    medhistory: {
        type: mongoose.Types.ObjectId,
        ref: 'MedHistory'
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    programs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserHProgram'
    }],
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);