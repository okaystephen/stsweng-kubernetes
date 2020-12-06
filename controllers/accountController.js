const db = require('../models/db');
const User = require('../models/UserModel');
const MedHistory = require('../models/MedHistoryModel');
const moment = require('moment');
const sanitize = require('mongo-sanitize');
const saltRounds = 10;
const bcrypt = require('bcrypt');

const accountController = {
    // render account page when client requests '/account' defined in routes.js
    getAccount: function (req, res){
        if(!req.session.user) res.redirect('/')
        else{
            db.findOne(User, {_id: req.session.user}, '', function(user){
                if(user){
                    user    
                        .populate('medhistory')
                        .execPopulate(function(err, data){
                            if(err) throw err;
                            console.log(data);
                            res.render('account', {
                                layout: 'profile',
                                active_session: (req.session.user && req.cookies.user_sid),
                                active_user: req.session.user,
                                title: 'Account | DoloMed',
                                user: data.toObject(),
                                date: moment(user.date).format('YYYY-MM-DD')
                            });
                        })
                }
            })
        }
    },

    updateProfile: function(req, res){
        if(!req.session.user) res.redirect('/')
        else{
            //sanitize user inputs
            const input = {};
            for (const field in req.body) {
                if (req.body.hasOwnProperty(field)) {
                    input[field] = sanitize(req.body[field]);
                    
                }
            }
            console.log(input);
            if(input.password == ''){
                db.updateOne(User, {_id: req.session.user}, {phone: input.phone, address: input.homeAdd, relationship: input.relationship, eContactPerson: input.eContactPerson, eContactNum: input.eContactNum}, function(result){
                    if(result){
                        res.redirect('/account');
                    }
                })
            }
            else{
                bcrypt.hash(input.password, saltRounds, (err, hash) => {
                    db.updateOne(User, {_id: req.session.user}, {password: hash, phone: input.phone, address: input.address, relationship: input.relationship, eContactPerson: input.eContactPerson, eContactNum: input.eContactNum}, function(result){
                        if(result){
                            res.redirect('/account');
                        }
                    })
                });
            }
        }
    },

    updateMedHis: function(req, res){
        if(!req.session.user) res.redirect('/')
        else{
            //sanitize user inputs
            const input = {};
            for (const field in req.body) {
                if (req.body.hasOwnProperty(field)) {
                    input[field] = sanitize(req.body[field]);
                    
                }
            }

            console.log(input);
            var medprob = input.medprob;

            if(medprob == 'Others'){
                medprob = input.medprob_other;
            }
            else if(medprob.includes('0')){
                medprob = "None"
            }
            else if(medprob.includes('Others')){
                var others = input.medprob_other.split(',')
                for (var i = 0; i < others.length; i++) {
                    others[i] = others[i].trim()
                }

                var index = medprob.indexOf('0');
                if (index > -1) {
                    medprob.splice(index, 1);
                }

                medprob = medprob.concat(others);
                var i = medprob.indexOf('Others');
                medprob.splice(i, 1);
            }

            var surgeries = input.surgeries.split(',');
            for (var i = 0; i < surgeries.length; i++) {
                surgeries[i] = surgeries[i].trim()
            }

            var medications = input.medications.split(',');
            for (var i = 0; i < medications.length; i++) {
                medications[i] = medications[i].trim()
            }

            var medallergies = input.medallergic.split(',');
            for (var i = 0; i < medallergies.length; i++) {
                medallergies[i] = medallergies[i].trim()
            }

            if(surgeries == ''){
                surgeries = "None"
            }
            if(medications == ''){
                medications = "None"
            }
            if(medallergies == ''){
                medallergies = "None"
            }

            db.updateOne(MedHistory, {_id: req.session.usermedhis}, {problems: medprob, surgeries: surgeries, medications: medications, medallergic: medallergies}, function(result){
                if(result){
                    res.redirect('/account');
                }
            })
        }
    },
}

// enables to account controller object when called in another .js file
module.exports = accountController;