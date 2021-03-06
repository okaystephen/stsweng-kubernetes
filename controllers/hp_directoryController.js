const db = require('../models/db');
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const moment = require('moment');
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const HealthProgram = require('../models/HealthProgramModel.js');
const UserProgram = require('../models/UserHProgramModel.js');
const Appointment = require('../models/AppointmentModel');

const hp_directoryController = {
    // render health program directory page when client requests '/healthprograms' defined in routes.js
    getHealthPrograms: function (req, res) {
        db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
            if (req.cookies.user_sid && req.session.user) {
                res.render('hp_directory', {
                    layout: 'main',
                    active_session: (req.session.user && req.cookies.user_sid),
                    user_id: req.session.user,
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    user_active: true,
                    healthprogramsContent: healthprogramsContent,
                })
            }
            else {
                res.render('hp_directory', {
                    layout: 'main',
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    healthprogramsContent: healthprogramsContent,
                })
            }
        });
    },

    getHealthProgramsFail: function (req, res) {
        db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
            res.render('hp_directory', {
                layout: 'main',
                title: 'Health Programs | DoloMed',
                hp_active: true,
                healthprogramsContent: healthprogramsContent,
                loginError: 'Invalid credentials!',
                loginmodalError: true,
            });
        });
    },

    loginHealthProgram: function (req, res) {
        var email = sanitize(req.body.loginemail_modal);
        var password = sanitize(req.body.loginpass_modal);

        db.findOne(User, { email: email }, {}, function (user) {
            db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
                if (user) {
                    console.log(user);
                    bcrypt.compare(password, user.password, function (err, equal) {
                        if (equal) {
                            // console.log('Username and password is correct.. Redirecting..');
                            if(user.email.trim() == 'admin@gmail.com'){
                                req.session.user = user._id;
                                req.session.type = 'admin';
                                res.redirect('/adminhp');
                            } else{
                                req.session.user = user._id;
                                res.redirect('/profile');
                            }
                        }
                        else {
                            res.render('landing', {
                                layout: 'main',
                                title: 'Home | DoloMed',
                                home_active: true,
                                login_active: true,
                                loginError: 'Invalid credentials!',
                                loginmodalError: true,
                            });
                            // res.redirect('back');
                        }
                    });
                }
                else {
                    res.redirect('/healthprograms/fail');
                }
            });
        })
    },

    postUserProgram: function (req, res) {
        if (!req.session.user) res.redirect('/')
        else {
            var reason = sanitize(req.body.reason);
            
             var program = new UserProgram({
                _id: new mongoose.Types.ObjectId(),
                healthprogram: req.params.hpId,
                user: req.session.user,
                reason: reason,
            })
            db.findOne(HealthProgram, {_id: req.body.hp_id}, '', function(flag){
                var cur = flag.participants.length
                var max = flag.hp_maxCap

                if (reason == '') {
                    db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
                        res.render('hp_directory', {
                            layout: 'main',
                            active_session: (req.session.user && req.cookies.user_sid),
                            user_id: req.session.user,
                            title: 'Health Programs | DoloMed',
                            hp_active: true,
                            user_active: true,
                            healthprogramsContent: healthprogramsContent,
                            test: req.body.hp_name,
                            error: true
                        })
                    });
                } else if(cur >= max){
                    db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
                        res.render('hp_directory', {
                            layout: 'main',
                            active_session: (req.session.user && req.cookies.user_sid),
                            user_id: req.session.user,
                            title: 'Health Programs | DoloMed',
                            hp_active: true,
                            user_active: true,
                            healthprogramsContent: healthprogramsContent,
                            test: req.body.hp_name,
                            max: true,
                            test: req.body.hp_name,
                        })
                    });
                } else {
                    db.insertOne(UserProgram, program, function(flag){
                        if(flag){
                            db.updateOne(User, {_id: req.session.user}, { $push: { programs: program.healthprogram} }, function (result){
                                if(result){
                                    db.updateOne(HealthProgram, {_id: req.params.hpId},  { $push: { participants: req.session.user } }, function (hp){
                                        if(hp){
                                            db.findMany(HealthProgram, {}, '', function(healthprogramsContent){
                                                res.render('hp_directory', {
                                                    layout: 'main',
                                                    active_session: (req.session.user && req.cookies.user_sid),
                                                    user_id: req.session.user,
                                                    title: 'Health Programs | DoloMed',
                                                    hp_active: true,
                                                    user_active: true,
                                                    healthprogramsContent: healthprogramsContent,
                                                    test: req.body.hp_name,
                                                    alert: true,
                                                })
                                            });
                                            //email user
                                            // db.findOne(User, {_id: req.session.user}, 'email', function(user){
                                            //     const output = `
                                            //     <p>You have a new message from Dolomed<p>
                                            //     <h3> ${req.body.hp_name} Details </h3>
                                            //     <p> Registration ID: ${flag._id} <p>
                                            //     <p> Date: ${req.body.hp_startdate} to ${req.body.hp_enddate} <p>
                                            //     <p> Timeslot: ${req.body.hp_starttime} - ${req.body.hp_endtime} </p>
                                            //     <p> Location: ${req.body.hp_location} </p>
                                            //     `;
                                                
                                            //     console.log(user.email);
                                            //     var mailOptions = {
                                            //         from: `${req.body.contact_email}`,
                                            //         to: 'victor_tulabot@dlsu.edu.ph',
                                            //         cc: 'tulabot18@gmail.com',
                                            //         subject: `${req.body.contact_subject}`,
                                            //         html: output,
                                            //     };
                                            // })
                                            
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    cancelProgram: function (req, res){
        db.updateOne(User, {_id: req.session.user}, {$pull: {programs: req.params.hpId}}, function(result){
            db.updateOne(HealthProgram, {_id: req.params.hpId},  { $pull: { participants: req.session.user } }, function (hp){
                if(hp){
                    db.deleteOne(UserProgram, {user: req.session.user, healthprogram: req.params.hpId})
                    db.findOne(User, { _id: req.session.user }, '', function (user) {
                        db.findMany(HealthProgram, { participants: { $elemMatch: { $eq: req.session.user } } }, '', function (result) {
                            db.findMany(Appointment, { appointment_id: req.session.user }, {}, function (appList) {
                                res.render('profile', {
                                    layout: 'profile',
                                    active_session: (req.session.user && req.cookies.user_sid),
                                    user_id: req.session.user,
                                    title: 'Profile | DoloMed',
                                    user: user.toObject(),
                                    healthprograms: result,
                                    appList: appList,
                                    success: req.body.hp_name,
                                    alert: true
                                });
                            })
                        });
                    })
                }
            })
        })
    }
}

// enables to account controller object when called in another .js file
module.exports = hp_directoryController;