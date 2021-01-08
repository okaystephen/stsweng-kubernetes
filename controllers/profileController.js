const db = require('../models/db');
const User = require('../models/UserModel');
const HealthProgram = require('../models/HealthProgramModel.js');
const Appointment = require('../models/AppointmentModel');

const profileController = {
    // render account page when client requests '/profile' defined in routes.js

    getProfile: function (req, res) {
        if (!req.session.user) res.redirect('/')
        else if(req.session.type == 'admin'){
            res.redirect('/adminhp');
        }
        else {
            db.findOne(User, { _id: req.session.user }, '', function (user) {
                db.findMany(HealthProgram, {participants: {$elemMatch: {$eq: req.session.user }}}, '', function(result){
                    db.findMany(Appointment, { appointment_id: req.session.user }, {}, function (appList) {
                        res.render('profile', {
                            layout: 'profile',
                            active_session: (req.session.user && req.cookies.user_sid),
                            active_user: req.session.user,
                            title: 'Profile | DoloMed',
                            user: user.toObject(),
                            healthprograms: result,
                            appList: appList,
                        });
                    })
                });
            })
        }
    },
}

// enables to profile controller object when called in another .js file
module.exports = profileController;