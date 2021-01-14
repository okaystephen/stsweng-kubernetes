const mongoose = require('mongoose');
const db = require('../models/db');
const HealthProgram = require('../models/HealthProgramModel.js');
const Doctor = require('../models/DoctorModel');
const User = require('../models/UserModel');
const UserProgram = require('../models/UserHProgramModel.js');
const { validationResult } = require('express-validator');
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
    },

    addHP: function (req, res){
        if (!req.session.user) res.redirect('/')
        else if(req.session.type != 'admin'){
            res.redirect('/profile');
        }
        else{
            res.render('add_healthprogram', {
                layout: 'main',
                active_session: (req.session.user && req.cookies.user_sid),
                user_id: req.session.user,
                title: 'Add Program | DoloMed',
                admin_active: true, 
                hp_active: true,
                addhp_active: true
            })
        }
    },

    postaddHP: function (req,res){
        var errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            for (let i = 0; i < errors.length; i++) {
                // remove array indices for wildcard checks
                details[`${errors[i].param.replace(/\[\d\]/g, '')}Error`] =
                    errors[i].msg;
            }

                res.render('add_healthprogram', {
                    layout: 'main',
                    active_session: (req.session.user && req.cookies.user_sid),
                    user_id: req.session.user,
                    input: req.body,
                    details: details,
                    title: 'Add Program | DoloMed',
                    admin_active: true, 
                    hp_active: true,
                    addhp_active: true,
                })
        } 
        else {
            //sanitize user inputs
            const input = {};
            for (const field in req.body) {
                if (req.body.hasOwnProperty(field)) {
                    input[field] = sanitize(req.body[field]);

                }
            }

             //concatenate start date and time hp_startdate: "2021-01-20 08:00",
             var start_time =  input.hp_starttime.split(":");
             var hour_start = start_time[0];
             if(hour_start == '00') {hour_start = 24}
             var min_start = start_time[1];

             var start = "";
             start += input.hp_startdate;
             start += " ";
             start += hour_start+":"+min_start;

             //concatenate end date and time
             var end_time =  input.hp_endtime.split(":");
             var hour_end = end_time[0];
             if(hour_end == '00') {hour_end = 24}
             var min_end = end_time[1];

             var end = "";
             end += input.hp_enddate;
             end += " ";
             end += hour_end+":"+min_end;

             var program = {
                _id: new mongoose.Types.ObjectId(),
                hp_name: input.hp_name,
                hp_desc: input.hp_description,
                hp_location: input.hp_location,
                hp_startdate: start,
                hp_enddate: end,
                hp_maxCap: input.hp_cap,
            }

            console.log(program);

            db.findOne(HealthProgram, {hp_name: input.hp_name}, '', function(flag){
                if(flag){
                    var start_date = new Date(start);
                    var end_date = new Date(end);
                   
                    if((flag.hp_startdate.getTime() == start_date.getTime()) && (flag.hp_enddate.getTime() == end_date.getTime()) && (flag.hp_desc == input.hp_description) && (flag.hp_location == input.hp_location) && (flag.hp_maxCap == input.hp_cap)){
                        db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
                            res.render('hp_directory', {
                                layout: 'main',
                                active_session: (req.session.user && req.cookies.user_sid),
                                user_id: req.session.user,
                                title: 'Health Programs | DoloMed',
                                admin_active: true,
                                hp_active: true,
                                duplicate: true,
                                test: input.hp_name,
                                healthprogramsContent: healthprogramsContent,
                            })
                        });
                    } else{
                        db.insertOne(HealthProgram, program, function(flag){
                            if(flag){
                                db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
                                    res.render('hp_directory', {
                                        layout: 'main',
                                        active_session: (req.session.user && req.cookies.user_sid),
                                        user_id: req.session.user,
                                        title: 'Health Programs | DoloMed',
                                        admin_active: true,
                                        hp_active: true,
                                        add: true,
                                        test: input.hp_name,
                                        healthprogramsContent: healthprogramsContent,
                                    })
                                });
                            }
                        })
                    }
                } else{
                    db.insertOne(HealthProgram, program, function(flag){
                        if(flag){
                            db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
                                res.render('hp_directory', {
                                    layout: 'main',
                                    active_session: (req.session.user && req.cookies.user_sid),
                                    user_id: req.session.user,
                                    title: 'Health Programs | DoloMed',
                                    admin_active: true,
                                    hp_active: true,
                                    add: true,
                                    test: input.hp_name,
                                    healthprogramsContent: healthprogramsContent,
                                })
                            });
                        }
                    })
                }
            })

        }
    },

    getPopulatedEditProgram: function (req, res){    
        HealthProgram.findOne({_id: req.params.hpId}, '')
            .exec()
            .then(doc =>
                res.render(
                    './partials/editProgramForm',
                    { hpData: doc.toObject(), layout: false },
                    (err, html) => {
                        if (err) throw err;
                        res.send(html);
                    },
                ),
            )
            .catch(err => {
                console.log(err);
                res.send(err);
            });
    },

    postEditProgram: function(req, res){
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            res.send(errors.map(e => e.msg));
        } else {
            //sanitize user inputs
            const input = {};
            for (const field in req.body) {
                if (req.body.hasOwnProperty(field)) {
                    input[field] = sanitize(req.body[field]);

                }
            }

             //concatenate start date and time hp_startdate: "2021-01-20 08:00",
             var start_time =  input.hp_starttime.split(":");
             var hour_start = start_time[0];
             if(hour_start == '00') {hour_start = 24}
             var min_start = start_time[1];

             var start = "";
             start += input.hp_startdate;
             start += " ";
             start += hour_start+":"+min_start;

             //concatenate end date and time
             var end_time =  input.hp_endtime.split(":");
             var hour_end = end_time[0];
             if(hour_end == '00') {hour_end = 24}
             var min_end = end_time[1];

             var end = "";
             end += input.hp_enddate;
             end += " ";
             end += hour_end+":"+min_end;

             var program = {
                _id: new mongoose.Types.ObjectId(),
                hp_name: input.hp_name,
                hp_desc: input.hp_description,
                hp_location: input.hp_location,
                hp_startdate: start,
                hp_enddate: end,
                hp_maxCap: input.hp_cap,
            }

            console.log(program);

            // db.updateOne(HealthProgram, { _id: req.params.hpId }, obj, result => {
            //     if (result) {
            //         res.send(obj);
            //     } else {
            //         res.status(500).send('An error occurred in the server');
            //     }
            // });
        }
    },

    deleteHP: function (req, res){
        var hpID = req.params.hpId;
        db.updateMany(User, {} ,{$pull: {programs: hpID}}, function(user){
            db.deleteMany(UserProgram, {healthprogram: hpID}, function(userprog){
                db.deleteOne(HealthProgram, {_id: hpID})
                db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
                    res.render('hp_directory', {
                        layout: 'main',
                        active_session: (req.session.user && req.cookies.user_sid),
                        user_id: req.session.user,
                        title: 'Health Programs | DoloMed',
                        admin_active: true,
                        hp_active: true,
                        delete: true,
                        test: req.body.hp_name,
                        healthprogramsContent: healthprogramsContent,
                    })
                });
            })
        })
    }
}

// enables to export controller object when called in another .js file
module.exports = adminController;