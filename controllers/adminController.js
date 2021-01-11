const db = require('../models/db');
const HealthProgram = require('../models/HealthProgramModel.js');
const Doctor = require('../models/DoctorModel');
const sanitize = require('mongo-sanitize');

const adminController = {
    getHP: function(req, res){
        if (!req.session.user) res.redirect('/')
        else{
            db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
                res.render('hp_directory', {
                    layout: 'main',
                    active_session: (req.session.user && req.cookies.user_sid),
                    user_id: req.session.user,
                    title: 'Health Programs | DoloMed',
                    admin_active: true,
                    hp_active: true,
                    healthprogramsContent: healthprogramsContent,
                })
            });
        }
    },

    getDoctors: function(req, res){
        if (!req.session.user) res.redirect('/')
        else{
            Doctor.find({})
                .lean()
                .sort({ lname: 1 })
                .exec(function (err, doctors) {
                    if (err) {
                        throw err
                    }
                    else {
                        res.render('doc_directory', {
                            layout: 'main',
                            doctors_active: true,
                            admin_active: true,
                            active_session: (req.session.user && req.cookies.user_sid),
                            active_user: req.session.user,
                            title: 'Doctors | DoloMed',
                            doctors: doctors
                        })
                    }
            })
        }
    },
    
    getFilter: function (req, res) {
        if (!req.session.user) res.redirect('/')
        else{
            //sanitize user inputs
            const input = {};
            for (const field in req.body) {
                if (req.body.hasOwnProperty(field)) {
                    input[field] = sanitize(req.body[field]);

                }
            }

            if ((input.surname == '') && (input.specialization == 'All') && (input.availability == 'All')) {
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
                                    admin_active: true,
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

            else if ((input.surname == '') && (input.specialization != 'All') && (input.availability == 'All')) {
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
                                    admin_active: true,
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

            else if ((input.surname == '') && (input.specialization == 'All') && (input.availability != 'All')) {
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
                                    admin_active: true,
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

            else if ((input.surname != '') && (input.specialization == 'All') && (input.availability == 'All')) {
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
                                    admin_active: true,
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

            else if ((input.surname != '') && (input.specialization == 'All') && (input.availability != 'All')) {
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
                                    admin_active: true,
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

            else if ((input.surname != '') && (input.specialization != 'All') && (input.availability == 'All')) {
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
                                    admin_active: true,
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

            else if ((input.surname == '') && (input.specialization != 'All') && (input.availability != 'All')) {
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
                                    admin_active: true,
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
}

// enables to export controller object when called in another .js file
module.exports = adminController;