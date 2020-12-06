const database = require('../models/db');
const User = require('../models/UserModel');
const moment = require('moment');
const HealthProgram = require('../models/HealthProgramModel.js');

const hp_directoryController = {
    // render account page when client requests '/account' defined in routes.js
   
    getHealthPrograms: function (req, res) {
        database.findMany(HealthProgram, {}, {}, function (healthprogramsContent) {
            if (req.cookies.user_sid && req.session.user) {
                res.render('hp_directory', {
                    layout: 'main',
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    user_active: true,
                    healthprogramsContent: healthprogramsContent,
                    test: "Test 1"
                })
            }
            else {
                res.render('hp_directory', {
                    layout: 'main',
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    healthprogramsContent: healthprogramsContent,
                    test: "Test 2"
                })
            }
        });
    },
}

// enables to account controller object when called in another .js file
module.exports = hp_directoryController;