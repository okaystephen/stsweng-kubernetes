// import module from db.js in models directory
const database = require('../models/db.js');
const HealthProgram = require('../models/HealthProgramModel.js');

// define objects for client request functions for a certain path in the server
const controller = {

    // Add controllers here
    getLanding: function (req, res) {
        res.render('landing', {
            title: 'Home | DoloMed',
            home_active: true,
        })
    },

    getHealthPrograms: function (req, res) {
        database.findMany(HealthProgram, {}, {}, function (healthprogramsContent) {
            res.render('hp_directory', {
                title: 'Health Programs | DoloMed',
                hp_active: true,
                healthprogramsContent: healthprogramsContent,
            })
        });
    },

}

// enables to export controller object when called in another .js file
module.exports = controller;