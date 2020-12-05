// import module from db.js in models directory
const database = require('../models/db.js');
const HealthProgram = require('../models/HealthProgramModel.js');

// define objects for client request functions for a certain path in the server
const controller = {

    // Add controllers here
    getLanding: function (req, res) {
        if (req.cookies.user_sid && req.session.user) {
            res.render('landing', {
                layout: 'main',
                title: 'Home | DoloMed',
                home_active: true,
                user_active: true,
            })
        }
        else {
            res.render('landing', {
                layout: 'main',
                title: 'Home | DoloMed',
                home_active: true,
                user_active: false,
            })
        }
    },

    getLogOut: function (req, res) {
        req.logout;
        req.session.destroy(function (err) { });
        // res.redirect('/')
        res.redirect('back');
    },

    getHealthPrograms: function (req, res) {
        database.findMany(HealthProgram, {}, {}, function (healthprogramsContent) {
            if (req.cookies.user_sid && req.session.user) {
                res.render('hp_directory', {
                    layout: 'main',
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

    getHealthPrograms: function (req, res) {
        if (req.cookies.user_sid && req.session.user) {
            res.render('set_appointment', {
                layout: 'profile',
                title: 'Set Appointment | DoloMed',
                appointment_true: true,
                user_active: true,
            })
        }
        else {
            res.render('set_appointment', {
                layout: 'profile',
                title: 'Set Appointment | DoloMed',
                appointment_true: true,
            })
        }
    },
}

// enables to export controller object when called in another .js file
module.exports = controller;