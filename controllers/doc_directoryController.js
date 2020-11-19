const db = require('../models/db');
const Doctor = require('../models/DoctorModel');

const doc_directoryController = {
    getDocDirectory: function (req, res){

        db.findMany(Doctor, {}, '', function(doctors){
            res.render('doc_directory', {
                doctors_active: true,
                active_session: (req.session.user && req.cookies.user_sid),
                active_user: req.session.user,
                title: 'Doctors | DoloMed',
                doctors: doctors
                
            }) 
        })
       
    },
}

module.exports = doc_directoryController;