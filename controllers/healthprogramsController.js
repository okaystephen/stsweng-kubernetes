const db = require('../models/db');
const User = require('../models/UserModel');
const MedHistory = require('../models/MedHistoryModel');
const sanitize = require('mongo-sanitize');
const saltRounds = 10;
const bcrypt = require('bcrypt');

const healthprogramsController = {
    // render add health program page when client requests '/add_healthprogram' defined in routes.js
    getHealthProgramsAdd: function (req, res){
        if(!req.session.user) res.redirect('/')
        else{
            db.findOne(User, {_id: req.session.user}, '', function(user){
                if(user){
                    user    
                        .populate('medhistory')
                        .execPopulate(function(err, data){
                            if(err) throw err;
                            console.log(data);
                            res.render('add_healthprogram', {
                                layout: 'profile',
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Add Health Programs | DoloMed',
                                user: data.toObject(),
                            });
                        })
                }
            })
        }
    },
}

// enables to export add health programs controller object when called in another .js file
module.exports = healthprogramsController;