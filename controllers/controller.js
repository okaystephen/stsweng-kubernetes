// import module from db.js in models directory
const database = require('../models/db.js');
const HealthProgram = require('../models/HealthProgramModel.js');

// define objects for client request functions for a certain path in the server
const controller = {

    // Add controllers here
    getLanding: function (req, res) {
        if (req.cookies.user_sid && req.session.user) {
            if(req.session.type == 'admin'){
                res.render('landing', {
                    layout: 'main',
                    title: 'Home | DoloMed',
                    home_active: true,
                    admin_active: true,
                })
            }
            else{
                res.render('landing', {
                    layout: 'main',
                    title: 'Home | DoloMed',
                    home_active: true,
                    user_active: true,
                })
            }
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
        res.redirect('back');
    },
}

// enables to export controller object when called in another .js file
module.exports = controller;