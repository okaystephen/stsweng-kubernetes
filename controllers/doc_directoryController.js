const db = require('../models/db');
const Doctor = require('../models/DoctorModel');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');

const doc_directoryController = {
    getDocDirectory: function (req, res) {
        Doctor.find({})
            .lean()
            .sort({ lname: 1 })
            .exec(function (err, doctors) {
                if (err) {
                    throw err
                }
                else {
                    if (req.cookies.user_sid && req.session.user) {
                        res.render('doc_directory', {
                            layout: 'main',
                            doctors_active: true,
                            user_active: true,
                            active_session: (req.session.user && req.cookies.user_sid),
                            active_user: req.session.user,
                            title: 'Doctors | DoloMed',
                            doctors: doctors
                        })
                    } else {
                        res.render('doc_directory', {
                            layout: 'main',
                            doctors_active: true,
                            active_session: (req.session.user && req.cookies.user_sid),
                            active_user: req.session.user,
                            title: 'Doctors | DoloMed',
                            doctors: doctors
                        })
                    }

                }
            })
    },

    getFilter: function (req, res) {
        //sanitize user inputs
        const input = {};
        for (const field in req.body) {
            if (req.body.hasOwnProperty(field)) {
                input[field] = sanitize(req.body[field]);

            }
        }

        if ((input.surname == '') && (input.specialization == 'Specialization') && (input.availability == 'Availability')) {
            Doctor.find({ lname: { $regex: input.surname, $options: "i" } })
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) {
                        throw err
                    }
                    else {
                        if (req.cookies.user_sid && req.session.user) {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                user_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        } else {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        }

                    }
                })
        }

        else if ((input.surname == '') && (input.specialization != 'Specialization') && (input.availability == 'Availability')) {
            Doctor.find({ specialization: input.specialization })
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) {
                        throw err
                    }
                    else {
                        if (req.cookies.user_sid && req.session.user) {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                user_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        } else {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        }

                    }
                })
        }

        else if ((input.surname == '') && (input.specialization == 'Specialization') && (input.availability != 'Availability')) {
            Doctor.find({ schedule: { $elemMatch: { day: input.availability } } })
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) {
                        throw err
                    }
                    else {
                        if (req.cookies.user_sid && req.session.user) {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                user_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        } else {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        }

                    }
                })
        }

        else if ((input.surname != '') && (input.specialization == 'Specialization') && (input.availability == 'Availability')) {
            Doctor.find({ lname: { $regex: input.surname, $options: "i" } })
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) {
                        throw err
                    }
                    else {
                        if (req.cookies.user_sid && req.session.user) {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                user_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        } else {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        }

                    }
                })
        }

        else if ((input.surname != '') && (input.specialization == 'Specialization') && (input.availability != 'Availability')) {
            Doctor.find({ lname: { $regex: input.surname, $options: "i" }, schedule: { $elemMatch: { day: input.availability } } })
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) {
                        throw err
                    }
                    else {
                        if (req.cookies.user_sid && req.session.user) {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                user_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        } else {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        }

                    }
                })
        }

        else if ((input.surname != '') && (input.specialization != 'Specialization') && (input.availability == 'Availability')) {
            Doctor.find({ lname: { $regex: input.surname, $options: "i" }, specialization: input.specialization })
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) {
                        throw err
                    }
                    else {
                        if (req.cookies.user_sid && req.session.user) {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                user_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        } else {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        }

                    }
                })
        }

        else if ((input.surname == '') && (input.specialization != 'Specialization') && (input.availability != 'Availability')) {
            Doctor.find({ specialization: input.specialization, schedule: { $elemMatch: { day: input.availability } } })
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) throw err
                    res.render('doc_directory', {
                        layout: 'main',
                        doctors_active: true,
                        active_session: (req.session.user && req.cookies.user_sid),
                        active_user: req.session.user,
                        title: 'Doctors | DoloMed',
                        doctors: doctors

                    })
                })
        }

        else {
            Doctor.find({ lname: { $regex: input.surname, $options: "i" }, specialization: input.specialization, schedule: { $elemMatch: { day: input.availability } } })
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) {
                        throw err
                    }
                    else {
                        if (req.cookies.user_sid && req.session.user) {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                user_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        } else {
                            res.render('doc_directory', {
                                layout: 'main',
                                doctors_active: true,
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Doctors | DoloMed',
                                doctors: doctors
                            })
                        }

                    }
                })
        }

    }
}

module.exports = doc_directoryController;