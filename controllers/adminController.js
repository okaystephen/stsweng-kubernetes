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
    }
}

// enables to export controller object when called in another .js file
module.exports = adminController;