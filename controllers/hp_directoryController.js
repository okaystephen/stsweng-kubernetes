const db = require('../models/db');
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const moment = require('moment');
const sanitize = require('mongo-sanitize');
const HealthProgram = require('../models/HealthProgramModel.js');
const UserProgram = require('../models/UserHProgramModel.js');

const hp_directoryController = {
    // render health program directory page when client requests '/healthprograms' defined in routes.js
    getHealthPrograms: function (req, res) {
        db.findMany(HealthProgram, {participants: {$ne: req.session.user }}, '', function(healthprogramsContent){
            if (req.cookies.user_sid && req.session.user) {
                res.render('hp_directory', {
                    layout: 'main',
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    user_active: true,
                    healthprogramsContent: healthprogramsContent,
                })
            }
            else {
                res.render('hp_directory', {
                    layout: 'main',
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    healthprogramsContent: healthprogramsContent,
                })
            }
        });
    },

    postUserProgram: function (req, res){
        if(!req.session.user) res.redirect('/')
        else {
            var reason = sanitize(req.body.reason);

             var program = new UserProgram({
                _id: req.params.hpId,
                user: req.session.user,
                reason: reason,
            })

            if(reason == ''){  
                db.findMany(HealthProgram, {participants: {$ne: req.session.user }}, '', function(healthprogramsContent){
                        res.render('hp_directory', {
                            layout: 'main',
                            title: 'Health Programs | DoloMed',
                            hp_active: true,
                            user_active: true,
                            healthprogramsContent: healthprogramsContent,
                            test: req.body.hp_name,
                            error: true
                        })
                });
            } else {
                db.insertOne(UserProgram, program, function(flag){
                    if(flag){
                        db.updateOne(User, {_id: req.session.user}, { $push: { programs: program._id} }, function (result){
                            if(result){
                                db.updateOne(HealthProgram, {_id: req.params.hpId},  { $push: { participants: req.session.user } }, function (hp){
                                    if(hp){
                                        db.findMany(HealthProgram, {participants: {$ne: req.session.user }}, '', function(healthprogramsContent){
                                                res.render('hp_directory', {
                                                    layout: 'main',
                                                    title: 'Health Programs | DoloMed',
                                                    hp_active: true,
                                                    user_active: true,
                                                    healthprogramsContent: healthprogramsContent,
                                                    test: req.body.hp_name,
                                                    alert: true,
                                                })
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            }
    
        }
    },

    cancelProgram: function (req, res){
        db.updateOne(User, {_id: req.session.user}, {$pull: {programs: req.params.hpId}}, function(result){
            db.updateOne(HealthProgram, {_id: req.params.hpId},  { $pull: { participants: req.session.user } }, function (hp){
                if(hp){
                    db.deleteOne(UserProgram, {_id: req.params.hpId})
                    res.redirect('/profile')
                }
            })
        })
    }
}

// enables to account controller object when called in another .js file
module.exports = hp_directoryController;