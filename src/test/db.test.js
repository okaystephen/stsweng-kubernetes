const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const UserModel = require('../../models/UserModel.js');

const DoctorModel = require('../../models/DoctorModel.js');

const AppointmentModel = require('../../models/AppointmentModel.js');
const appData = {
    _id: new ObjectID(),
    appointment_id: new ObjectID(),
    appointment_date: new Date("2021-01-20T00:00:00.000Z"),
    appointment_name: 'Last, First',
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

const MedHistoryModel = require('../../models/MedHistoryModel.js');

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
        expect(savedApp.appointment_reason).toBe(validApp.appointment_reason);

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