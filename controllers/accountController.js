const db = require('../models/db');
const User = require('../models/UserModel');
const MedHis = require('../models/MedHistoryModel');
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
                res.render('account', {
                    active_session: (req.session.user && req.cookies.user_sid),
                    active_user: req.session.user,
                    title: 'Account | DoloMed',
                    user: user.toObject(),
                    date: moment(user.date).format('YYYY-MM-DD')
             });
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
            db.updateOne(MedHis, {_id: req.session.usermedhis}, {problems: input.medprob, surgeries: input.surgeries, medications: input.medications, medallergic: input.medallergies}, function(result){
                if(result){
                    res.redirect('/account');
                }
            })
        }
    },
}

// enables to account controller object when called in another .js file
module.exports = accountController;