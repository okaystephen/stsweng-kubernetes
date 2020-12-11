const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');


const MedHistoryModel = require('../../models/MedHistoryModel.js');
const medhist = {
    _id: new ObjectID(),
    problems: ['None'],
    surgeries: ['None'],
    medications: ['None'],
    medallergic: ['None']
}

const UserModel = require('../../models/UserModel.js');
const user = {
    _id: new ObjectID(),
    email: 'sample@gmail.com',
    password: 'sample',
    name: { first: 'Sample', middle: 'Test', last: 'User' },
    phone: '09194638338',
    birthdate: new Date("2000-01-20T00:00:00.000Z"),
    sex: 'Female',
    address: 'B1 L15',
    eContactPerson: 'Sample',
    eContactNum: '09194638339',
    relationship: 'Sibling',
    medhistory: medhist._id
}

const DoctorModel = require('../../models/DoctorModel.js');
const doctor = {
    _id: new ObjectID(),
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

const AppointmentModel = require('../../models/AppointmentModel.js');
const appData = {
    _id: new ObjectID(),
    appointment_id: new ObjectID(),
    appointment_date: new Date("2021-01-20T00:00:00.000Z"),
    appointment_name: 'Last, First',
    appointment_docID: new ObjectID(),
    appointment_reason: 'Reason',
}

const HealthProgramModel = require('../../models/HealthProgramModel.js');
const hpData = {
    _id: new ObjectID(),
    hp_name: 'Blood Donation Program',
    hp_desc: 'Republic Act No. 7719, also known as the National Blood Services Act of 1994, promotes voluntary blood donation to provide sufficient supply of safe blood and to regulate blood banks. This act aims to inculcate public awareness that blood donation is a humanitarian act.',
    hp_location: 'Parañaque, Manila',
    hp_startdate: new Date("2021-01-20T00:00:00.000Z"),
    hp_enddate: new Date("2021-02-20T05:00:00.000Z"),
    hp_maxCap: 130,
}

const UserHProgramModel = require('../../models/UserHProgramModel.js');
const program = {
    _id: new ObjectID(),
    healthprogram: hpData._id,
    user: user._id,
    reason: "no reason"
}

describe('Database Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('User Medical History Model - create user medical history successfully', async () => {
        const validMH = new MedHistoryModel(medhist);
        const savedUMH = await validMH.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUMH._id).toBeDefined();
        expect(savedUMH.problems).toBe(validMH.problems);
        expect(savedUMH.surgeries).toBe(validMH.surgeries);
        expect(savedUMH.medications).toBe(validMH.medications);
        expect(savedUMH.medallergic).toBe(validMH.medallergic);
    });


    it('User Model - register user successfully', async () => {
        const validUser = new UserModel(user);
        const savedUM = await validUser.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUM._id).toBeDefined();
        expect(savedUM.address).toBe(user.address);
        expect(savedUM.birthdate).toBe(user.birthdate);
        expect(savedUM.eContactNum).toBe(user.eContactNum);
        expect(savedUM.eContactPerson).toBe(user.eContactPerson);
        expect(savedUM.email).toBe(user.email);
        expect(savedUM.medhistory).toBe(user.medhistory);
        expect(savedUM.name).toBe(validUser.name);
        expect(savedUM.password).toBe(user.password);
        expect(savedUM.phone).toBe(user.phone);
        expect(savedUM.relationship).toBe(user.relationship);
        expect(savedUM.sex).toBe(user.sex);
    });

    it('Doctor Model - create & save a doctor successfully', async () => {
        const validDoc = new DoctorModel(doctor);
        const savedDoc = await validDoc.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedDoc._id).toBeDefined();
        expect(savedDoc.fname).toBe(doctor.fname);
        expect(savedDoc.lname).toBe(doctor.lname);
        expect(savedDoc.department).toBe(doctor.department);
        expect(savedDoc.schedule).toBe(validDoc.schedule);
        expect(savedDoc.specialization).toBe(doctor.specialization);
        expect(savedDoc.avatar).toBe(doctor.avatar);
    });

    it('Health Program Model - create & save a health program successfully', async () => {
        const validHP = new HealthProgramModel(hpData);
        const savedHP = await validHP.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedHP._id).toBe(hpData._id);
        expect(savedHP.hp_name).toBe(hpData.hp_name);
        expect(savedHP.hp_desc).toBe(hpData.hp_desc);
        expect(savedHP.hp_location).toBe(hpData.hp_location);
        expect(savedHP.hp_startdate).toBe(hpData.hp_startdate);
        expect(savedHP.hp_enddate).toBe(hpData.hp_enddate);
        expect(savedHP.hp_maxCap).toBe(hpData.hp_maxCap);

    });

    it('Appointment Model - create & save an appointment successfully', async () => {
        const validApp = new AppointmentModel(appData);
        const savedApp = await validApp.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedApp._id).toBeDefined();
        expect(savedApp.appointment_id).toBe(validApp.appointment_id);
        expect(savedApp.appointment_date).toBe(validApp.appointment_date);
        expect(savedApp.appointment_name).toBe(validApp.appointment_name);
        expect(savedApp.appointment_docID).toBeDefined();
        expect(savedApp.appointment_reason).toBe(validApp.appointment_reason);

    });

    it('User Health Program Model - user registers to health program successfully', async () => {
        const validUHP = new UserHProgramModel(program);
        const savedUHP = await validUHP.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUHP._id).toBeDefined();
        expect(savedUHP.healthprogram).toBe(program.healthprogram);
        expect(savedUHP.user).toBe(program.user);
        expect(savedUHP.reason).toBe(program.reason);
    });

    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close()
        done()
    })

    // // Test Schema is working!!!
    // // You shouldn't be able to add in any field that isn't defined in the schema
    // it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    //     const userWithInvalidField = new UserModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
    //     const savedUserWithInvalidField = await userWithInvalidField.save();
    //     expect(savedUserWithInvalidField._id).toBeDefined();
    //     expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    // });

    // // Test Validation is working!!!
    // // It should us told us the errors in on gender field
    // it('create user without required field should failed', async () => {
    //     const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
    //     let err;
    //     try {
    //         const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
    //         error = savedUserWithoutRequiredField;
    //     } catch (error) {
    //         err = error
    //     }
    //     expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    //     expect(err.errors.gender).toBeDefined();
    // });

})