const db = require('../models/db');
const User = require('../models/UserModel');
const HealthProgram = require('../models/HealthProgramModel.js');
const moment = require('moment');

const profileController = {
    // render account page when client requests '/profile' defined in routes.js

    getProfile: function (req, res) {
        if (!req.session.user) res.redirect('/')
        else {
            db.findOne(User, { _id: req.session.user }, '', function (user) {
                 db.findMany(HealthProgram, {participants: {$elemMatch: {$eq: req.session.user }}}, '', function(result){
                    console.log(result)
                    res.render('profile', {
                        layout: 'profile',
                        active_session: (req.session.user && req.cookies.user_sid),
                        active_user: req.session.user,
                        title: 'Profile | DoloMed',
                        user: user.toObject(),
                        healthprograms: result
                    });
                })
            })
        }
    },
}

// enables to profile controller object when called in another .js file
module.exports = profileController;