const db = require('../models/db');
const HealthProgram = require('../models/HealthProgramModel.js');

const adminController = {
    getHP: function(req, res){
        db.findMany(HealthProgram, {}, '', function (healthprogramsContent) {
            res.render('hp_directory', {
                layout: 'main',
                active_session: (req.session.user && req.cookies.user_sid),
                user_id: req.session.user,
                title: 'Health Programs | DoloMed',
                admin_active: true,
                hp_active: true,
                healthprogramsContent: healthprogramsContent,
            })
        });
    },

    getDoctors: function(req, res){
        Doctor.find({})
            .lean()
            .sort({ lname: 1 })
            .exec(function (err, doctors) {
                if (err) {
                    throw err
                }
                else {
                    if (req.cookies.user_sid && req.session.user) {
                        res.render('doc_directory', {
                            layout: 'main',
                            doctors_active: true,
                            user_active: true,
                            active_session: (req.session.user && req.cookies.user_sid),
                            active_user: req.session.user,
                            title: 'Doctors | DoloMed',
                            doctors: doctors
                        })
                    } else {
                        res.render('doc_directory', {
                            layout: 'main',
                            doctors_active: true,
                            active_session: (req.session.user && req.cookies.user_sid),
                            active_user: req.session.user,
                            title: 'Doctors | DoloMed',
                            doctors: doctors
                        })
                    }

                }
            })
    } 
}

// enables to export controller object when called in another .js file
module.exports = adminController;