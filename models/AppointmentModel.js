const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    appointment_date: {
        type: Date,
        required: true,
    },
    appointment_name: {
        type: String,
        required: true,
    },
    appointment_docID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    appointment_reason: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);