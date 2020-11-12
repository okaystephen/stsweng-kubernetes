// import module from db.js in models directory
const database = require('../models/db.js');

// define objects for client request functions for a certain path in the server
const controller = {

    // Add controllers here
    getLanding: function (req, res) {
        res.render('landing', {
            // layout: '/layouts/main',
            title: 'Home | DoLoMed',
            home_active: true,
        })
    },

}

// enables to export controller object when called in another .js file
module.exports = controller;