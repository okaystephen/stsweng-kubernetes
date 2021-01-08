const db = require('../models/db');
const User = require('../models/UserModel');
const HealthProgram = require('../models/HealthProgramModel.js');
const Appointment = require('../models/AppointmentModel');
const Doctor = require('../models/DoctorModel');
const { ObjectID } = require('mongodb');
const moment = require('moment');

const appointmentController = {
    // render account page when client requests '/profile' defined in routes.js
    getAppointment: function (req, res) {
        if (!req.session.user) res.redirect('/')
        else {
            db.findOne(User, { _id: req.session.user }, '', function (user) {
                db.findMany(Doctor, {}, {}, function (docList) {
                    res.render('set_appointment', {
                        layout: 'profile',
                        active_session: (req.session.user && req.cookies.user_sid),
                        active_user: req.session.user,
                        title: 'Set Appointment | DoloMed',
                        user: user.toObject(),
                        date: moment(user.date).format('YYYY-MM-DD'),
                        docList: docList,
                    })
                });
            })
        }
    },

    postAppointment: function (req, res) {
        var appointment_id = req.session.user;
        var appointment_date = new Date(req.body.appointment_date + " " + req.body.appointment_time);
        var appointment_name = req.body.appointment_name;
        var appointment_docID = req.body.appointment_docID;
        var appointment_reason = req.body.appointment_reason;

        var newAppointment = {
            _id: new ObjectID(),
            appointment_id: ObjectID(appointment_id),
            appointment_date: appointment_date,
            appointment_docID: ObjectID(appointment_docID),
            appointment_name: appointment_name,
            appointment_reason: appointment_reason,
        }

        Appointment.countDocuments({ appointment_name: appointment_name, appointment_date: appointment_date }, function (err, count) {
            db.findOne(User, { _id: req.session.user }, '', function (user) {
                if (count == 0) {
                    db.insertOne(Appointment, newAppointment, function (f) {
                        if (f) {
                            console.log('Appointment Added: ' + appointment_name);
                            res.redirect('/profile');
                        }
                    });
                } else {
                    res.render('set_appointment', {
                        layout: 'profile',
                        active_session: (req.session.user && req.cookies.user_sid),
                        active_user: req.session.user,
                        title: 'Set Appointment | DoloMed',
                        user: user.toObject(),
                        doctor: appointment_name,
                        app_alert: true,
                    });
                }
            })
        });
    },

    reschedAppointment: function (req, res) {
        var id = req.query.id;
        var docID = req.query.doc;

        if (!req.session.user) res.redirect('/')
        else {
            db.findOne(User, { _id: req.session.user }, '', function (user) {
                db.findMany(Doctor, {}, {}, function (docList) {
                    db.findOne(Appointment, { _id: id }, {}, function (app) {
                        res.render('resched_appointment', {
                            layout: 'profile',
                            active_session: (req.session.user && req.cookies.user_sid),
                            active_user: req.session.user,
                            title: 'Reschedule Appointment | DoloMed',
                            user: user.toObject(),
                            date: moment(user.date).format('YYYY-MM-DD'),
                            initID: id,
                            docID: docID,
                            docList: docList,
                            app: app.toObject(),
                        })
                    })
                });
            })
        }
    },

    postreschedAppointment: function (req, res) {
        var id = req.query.id;
        var docID = req.query.doc;

        var appointment_id = req.session.user;
        var appointment_initID = req.body.appointment_initID;
        var appointment_date = new Date(req.body.appointment_date + " " + req.body.appointment_time);
        var appointment_name = req.body.appointment_name;
        var appointment_docID = req.body.appointment_docID;
        var appointment_reason = req.body.appointment_reason;

        var appointment_details = {
            appointment_id: ObjectID(appointment_id),
            appointment_date: appointment_date,
            appointment_docID: ObjectID(appointment_docID),
            appointment_name: appointment_name,
            appointment_reason: appointment_reason,
        }

        Appointment.countDocuments({ appointment_name: appointment_name, appointment_date: appointment_date }, function (err, count) {
            db.findOne(User, { _id: req.session.user }, '', function (user) {
                if (count == 0) {
                    Appointment.updateOne({ _id: ObjectID(appointment_initID) }, appointment_details, function (err, docs) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("Updated Docs : ", docs);
                            db.findMany(HealthProgram, { participants: { $elemMatch: { $eq: req.session.user } } }, '', function (result) {
                                db.findMany(Appointment, { appointment_id: req.session.user }, {}, function (appList) {
                                    res.render('profile', {
                                        layout: 'profile',
                                        active_session: (req.session.user && req.cookies.user_sid),
                                        active_user: req.session.user,
                                        title: 'Profile | DoloMed',
                                        user: user.toObject(),
                                        healthprograms: result,
                                        appList: appList,
                                        doctor_success: appointment_name,
                                        resched_alert: true,
                                    });
                                })
                            });
                        }
                    });

                } else {
                    db.findMany(Doctor, {}, {}, function (docList) {
                        db.findOne(Appointment, { _id: ObjectID(id) }, {}, function (app) {
                            res.render('resched_appointment', {
                                layout: 'profile',
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Reschedule Appointment | DoloMed',
                                user: user.toObject(),
                                date: moment(user.date).format('YYYY-MM-DD'),
                                docID: docID,
                                initID: id,
                                docList: docList,
                                app: app.toObject(),
                                doctor: appointment_name,
                                app_alert: true,
                            });
                        })
                    });


                }
            })
        });
    },

    deleteAppointment: function (req, res) {
        var appointment_id = req.query.id;
        var docname = req.query.doc;
        var appointment_details = {
            _id: ObjectID(appointment_id)
        }

        db.deleteOne(Appointment, appointment_details);

        db.findOne(User, { _id: req.session.user }, '', function (user) {
            db.findMany(HealthProgram, { participants: { $elemMatch: { $eq: req.session.user } } }, '', function (result) {
                db.findMany(Appointment, { appointment_id: req.session.user }, {}, function (appList) {
                    res.render('profile', {
                        layout: 'profile',
                        active_session: (req.session.user && req.cookies.user_sid),
                        active_user: req.session.user,
                        title: 'Profile | DoloMed',
                        user: user.toObject(),
                        healthprograms: result,
                        appList: appList,
                        doctor_success: docname,
                        doctor_alert: true,
                    });
                })
            });
        })
    },
}

// enables to profile controller object when called in another .js file
module.exports = appointmentController;