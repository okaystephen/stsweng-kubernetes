// import module from db.js in models directory
const database = require('../models/db.js');

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
        res.render('hp_directory', {
            title: 'Health Programs | DoloMed',
            hp_active: true,
        })
    },

}

// enables to export controller object when called in another .js file
module.exports = controller;