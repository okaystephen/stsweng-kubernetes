// import module from db.js in models directory
const database = require('../models/db.js');
const HealthProgram = require('../models/HealthProgramModel.js');

// define objects for client request functions for a certain path in the server
const controller = {

    // Add controllers here
    getLanding: function (req, res) {
        if (req.cookies.user_sid && !req.session.user) {
            res.render('landing', {
                title: 'Home | DoloMed',
                home_active: true,
                user_active: true,
            })
        }
        else {
            res.render('landing', {
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
            if (req.cookies.user_sid && !req.session.user) {
                res.render('hp_directory', {
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    user_active: true,
                    healthprogramsContent: healthprogramsContent,
                    test: "Test 1"
                })
            }
            else {
                res.render('hp_directory', {
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    healthprogramsContent: healthprogramsContent,
                    test: "Test 2"
                })
            }
        });
    },
}

// enables to export controller object when called in another .js file
module.exports = controller;