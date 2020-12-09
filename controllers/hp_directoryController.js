const db = require('../models/db');
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const moment = require('moment');
const sanitize = require('mongo-sanitize');
const HealthProgram = require('../models/HealthProgramModel.js');
const UserProgram = require('../models/UserHProgramModel.js');

const hp_directoryController = {
    // render account page when client requests '/account' defined in routes.js
    getHealthPrograms: function (req, res) {
        db.findMany(HealthProgram, {}, {}, function (healthprogramsContent) {
            if (req.cookies.user_sid && req.session.user) {
                res.render('hp_directory', {
                    layout: 'main',
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    user_active: true,
                    healthprogramsContent: healthprogramsContent,
                    test: "Test 1"
                })
            }
            else {
                res.render('hp_directory', {
                    layout: 'main',
                    title: 'Health Programs | DoloMed',
                    hp_active: true,
                    healthprogramsContent: healthprogramsContent,
                    test: "Test 2"
                })
            }
        });
    },

    postUserProgram: function (req, res){
        console.log(req.params.hpId)
        var reason = sanitize(req.body.reason);
        var exposure = sanitize(req.body.exposure);


        var program = new UserProgram({
            _id: new mongoose.Types.ObjectId(),
            program: req.params.hpId,
            reason: reason,
            exposure: exposure
        })

        console.log(program);
        console.log(req.session.user);

        db.insertOne(UserProgram, program, function(flag){
            if(flag){
                db.updateOne(User, {_id: req.session.user}, { $push: { programs: program._id} }, function (result){
                    if(result){
                        db.updateOne(HealthProgram, {_id: req.params.hpId},  { $push: { participants: req.session.user } }, function (result){
                            if(result){
                                res.redirect('/healthprograms')
                            }
                        })
                    }
                })
            }
        })

    }
}

// enables to account controller object when called in another .js file
module.exports = hp_directoryController;