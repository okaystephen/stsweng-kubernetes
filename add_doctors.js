const mongoose = require('mongoose');
const db = require('./models/db');
const Doctor = require('./models/DoctorModel');

const url = 'mongodb://localhost:27017/stsweng-kubernetes';
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
                { start: '09:00 am', end: '12:00 pm'},
                { start: '3:00 pm', end: '5:00 pm'}
            ]
        },
        {
            day: 'Thursday',
            time: [ 
                { start: '2:00 pm', end: '4:00 pm'}
            ]
        },
    ]
}

db.insertOne(Doctor, doctor, function(){
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
                { start: '07:00 am', end: '09:00 am'},
            ]
        },
        {
            day: 'Wednesday',
            time: [ 
                { start: '9:00 am', end: '10:00 am'},
                { start: '2:00 pm', end: '4:00 pm'},
            ]
        },
    ]
}

db.insertOne(Doctor, doctor1, function(){
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
                { start: '09:00 am', end: '12:00 pm'}
            ]
        },
        {
            day: 'Saturday',
            time: [ 
                { start: '12:00 pm', end: '2:00 pm'}
            ]
        },
    ]
}

db.insertOne(Doctor, doctor2, function(){
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
                { start: '3:00 pm', end: '6:00 pm'}
            ]
        },
        {
            day: 'Thursday',
            time: [ 
                { start: '2:00 pm', end: '4:00 pm'}
            ]
        },
        {
            day: 'Sunday',
            time: [ 
                { start: '10:00 am', end: '1:00 pm'}
            ]
        },
    ]
}

db.insertOne(Doctor, doctor3, function(){
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
                { start: '09:00 am', end: '12:00 pm'},
                { start: '3:00 pm', end: '5:00 pm'}
            ]
        },
    ]
}

db.insertOne(Doctor, doctor4, function(){
})



