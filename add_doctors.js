const mongoose = require('mongoose');
const db = require('./models/db');
const Doctor = require('./models/DoctorModel');
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.MONGO_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect(url, options, err => {
    if (err) throw err;
    console.log('Connected at ' + url);
});


var doctor = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Natalio',
    lname: 'Albana',
    specialization: 'Surgery',
    avatar: 'doctor.png',
    department: 'Department of Surgery',
    schedule: [
        {
            day: 'Monday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
        {
            day: 'Thursday',
            time: [
                { start: '2:00 pm', end: '4:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor, function () {
})

var doctor1 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Elmer',
    lname: 'Reyes',
    specialization: 'Family Medicine',
    avatar: 'doctor.png',
    department: 'Department of Family Medicine',
    schedule: [
        {
            day: 'Tuesday',
            time: [
                { start: '07:00 am', end: '09:00 am' },
            ]
        },
        {
            day: 'Wednesday',
            time: [
                { start: '9:00 am', end: '10:00 am' },
                { start: '2:00 pm', end: '4:00 pm' },
            ]
        },
    ]
}

db.insertOne(Doctor, doctor1, function () {
})

var doctor2 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Ramon',
    lname: 'Arcadio',
    specialization: 'Pediatrics',
    avatar: 'doctor.png',
    department: 'Department of Pediatrics',
    schedule: [
        {
            day: 'Friday',
            time: [
                { start: '09:00 am', end: '12:00 pm' }
            ]
        },
        {
            day: 'Saturday',
            time: [
                { start: '12:00 pm', end: '2:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor2, function () {
})

var doctor3 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Orlando',
    lname: 'Bernardo',
    specialization: 'Anesthesiology',
    avatar: 'doctor.png',
    department: 'Department of Anesthesiology',
    schedule: [
        {
            day: 'Monday',
            time: [
                { start: '3:00 pm', end: '6:00 pm' }
            ]
        },
        {
            day: 'Thursday',
            time: [
                { start: '2:00 pm', end: '4:00 pm' }
            ]
        },
        {
            day: 'Sunday',
            time: [
                { start: '10:00 am', end: '1:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor3, function () {
})

var doctor4 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Roland',
    lname: 'Capito',
    specialization: 'Obstetrics and Gynecology',
    avatar: 'doctor.png',
    department: 'Department of Obstetrics and Gynecology',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor4, function () {
})

var doctor5 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Juan',
    lname: 'Dela Cruz',
    specialization: 'Dental Medicine',
    avatar: 'doctor.png',
    department: 'Department of Dental Medicine',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor5, function () {
})

var doctor6 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'James',
    lname: 'Bones',
    specialization: 'Orthopedics',
    avatar: 'doctor.png',
    department: 'Department of Orthopedics',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor6, function () {
})

var doctor7 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Der',
    lname: 'Matology',
    specialization: 'Dermatology',
    avatar: 'doctor.png',
    department: 'Department of Dermatology',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor7, function () {
})

var doctor8 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Int',
    lname: 'Ernal Med',
    specialization: 'Internal Medicine',
    avatar: 'doctor.png',
    department: 'Department of Internal Medicine',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor8, function () {
})

var doctor9 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Lab',
    lname: 'Kita',
    specialization: 'Laboratory Medicine',
    avatar: 'doctor.png',
    department: 'Department of Laboratory Medicine',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor9, function () {
})

var doctor10 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Lawyer',
    lname: 'Dela Cruz',
    specialization: 'Legal Medicine',
    avatar: 'doctor.png',
    department: 'Department of Legal Medicine',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor10, function () {
})

var doctor11 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Boom',
    lname: 'Dela Cruz',
    specialization: 'Nuclear Medicine',
    avatar: 'doctor.png',
    department: 'Department of Nuclear Medicine',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor11, function () {
})

var doctor12 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Sana',
    lname: 'Ol May Trabaho',
    specialization: 'Occupational Medicine',
    avatar: 'doctor.png',
    department: 'Department of Occupational Medicine',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor12, function () {
})

var doctor13 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Eyes',
    lname: 'On You',
    specialization: 'Ophthalmology',
    avatar: 'doctor.png',
    department: 'Department of Ophthalmology',
    schedule: [
        {
            day: 'Wednesday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor13, function () {
})

var doctor14 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Eyes Nose Lips',
    lname: 'Taeyang',
    specialization: 'Otorhinolaryngology',
    avatar: 'doctor.png',
    department: 'Department of Otorhinolaryngology',
    schedule: [
        {
            day: 'Saturday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor14, function () {
})

var doctor15 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Xavier',
    lname: 'Tagubat',
    specialization: 'Radiology',
    avatar: 'doctor.png',
    department: 'Department of Radiology',
    schedule: [
        {
            day: 'Friday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor15, function () {
})

var doctor16 = {
    _id: new mongoose.Types.ObjectId(),
    fname: 'Rekta',
    lname: 'Jailt',
    specialization: 'Rehabilitation Medicine',
    avatar: 'doctor.png',
    department: 'Department of Rehab',
    schedule: [
        {
            day: 'Friday',
            time: [
                { start: '09:00 am', end: '12:00 pm' },
                { start: '3:00 pm', end: '5:00 pm' }
            ]
        },
    ]
}

db.insertOne(Doctor, doctor16, function () {
})


