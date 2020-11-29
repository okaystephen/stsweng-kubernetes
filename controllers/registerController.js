const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const sanitize = require('mongo-sanitize');
const db = require('../models/db');
const User = require('../models/UserModel');
const MedHistory = require('../models/MedHistoryModel');
const saltRounds = 10;

// define objects for client request functions for a certain path in the server
const registerController = {
    // render log-in page when client requests '/register' defined in routes.js
    getRegister: function (req, res){
        res.render('register', {
               active_session: (req.session.user && req.cookies.user_sid),
               active_user: req.session.user,
               title: 'Register | DoliMed'
        });
    },

    postRegister: function (req, res){
        var errors = validationResult(req);
        console.log(req.body)

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
            //sanitize user inputs
            const input = {};
            for (const field in req.body) {
                if (req.body.hasOwnProperty(field)) {
                    input[field] = sanitize(req.body[field]);
                    
                }
            }

            var sex = input.sex;
            if(sex == 'Others'){
                sex = input.otherAnswer;
            }
            
            var medprob = input.medprob;
            if(medprob == 'Others'){
                medprob = input.medprob_other;
            }
            else if(medprob == ''){
                medprob = "None"
            }
            else if(medprob.includes('Others')){
                medprob = medprob.concat(input.medprob_other);
                var i = medprob.indexOf('Others');
                medprob.splice(i, 1);
            }

            var surgeries = input.surgeries;
            var medications = input.medications;
            var medallergies = input.medallergies;

            if(surgeries == ''){
                surgeries = "None"
            }
            if(medications == ''){
                medications = "None"
            }
            if(medallergies == ''){
                medallergies = "None"
            }

            var medhist = {
                _id: new mongoose.Types.ObjectId(),
                problems: medprob,
                surgeries: surgeries,
                medications: medications,
                medallergic: medallergies
            }

            db.insertOne(MedHistory, medhist, function(flag){
                if(flag){
                    // apply hashing
                    bcrypt.hash(input.password, saltRounds, (err, hash) => {
                        var user = {
                            _id: new mongoose.Types.ObjectId(),
                            email: input.email,
                            password: hash,
                            name: {first: input.fname, last: input.lname},
                            phone: input.phone,
                            relationship: input.relationship,
                            birthdate: input.date,
                            sex: sex,
                            address: input.homeAdd,
                            eContactPerson: input.eContactPerson,
                            eContactNum: input.eContactNum,
                            medhistory: medhist._id
                        };

                        // create a new User document
                        db.insertOne(User, user, function (flag) {
                            if (flag) {

                                //user id session is stored
                                req.session.user = user._id;
                                //redirects to dashboard
                                console.log('Success!');
                                res.redirect('/profile')
                            }
                        });
                    });
                }
            })
            
                    
        }
    }
};

// enables to export controller object when called in another .js file
module.exports = registerController;