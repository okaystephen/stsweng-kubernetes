const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

// define objects for client request functions for a certain path in the server
const registerController = {
    // render log-in page when client requests '/register' defined in routes.js
    getRegister: function (req, res){
        res.render('register', {
            active_session: (req.session.user && req.cookies.user_sid),
               active_user: req.session.user,
               title: 'Sign Up | DoliMed'
        });
    },

    postRegister: function (req, res){
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};

            
            for (let i = 0; i < errors.length; i++) {
                // remove array indices for wildcard checks
                details[`${errors[i].param.replace(/\[\d\]/g, '')}Error`] =
                    errors[i].msg;
            }
            res.render('register', {
                input: req.body,
                details: details,
                active_session: req.session.user && req.cookies.user_sid,
                active_user: req.session.user,
                title: 'Register | DoliMed',
            });
        } else {
        
        }
    }
};

// enables to export controller object when called in another .js file
module.exports = registerController;