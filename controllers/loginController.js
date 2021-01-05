const bcrypt = require('bcrypt');
const session = require('express-session');
const sanitize = require('mongo-sanitize');
const database = require('../models/db.js');
const User = require('../models/UserModel');
const loginController = {

    postLogIn: function (req, res) {

        var email = sanitize(req.body.loginemail_modal);
        var password = sanitize(req.body.loginpass_modal);

        database.findOne(User, { email: email }, {}, function (user) {
            if (user) {
                console.log(user);
                bcrypt.compare(password, user.password, function (err, equal) {
                    // console.log(equal)
                    if (equal) {
                        // console.log('Username and password is correct.. Redirecting..');
                        if(user.email.trim() == 'admin@gmail.com'){
                            req.session.user = user._id;
                            res.redirect('/adminhp');
                        } else{
                            req.session.user = user._id;
                            res.redirect('/profile');
                        }
                    }
                    else {
                        res.render('landing', {
                            layout: 'main',
                            title: 'Home | DoloMed',
                            home_active: true,
                            login_active: true,
                            loginError: 'Invalid credentials!',
                            loginmodalError: true,
                        });
                        // res.redirect('back');
                    }
                });
            }
            else {
                res.render('landing', {
                    layout: 'main',
                    title: 'Home | DoloMed',
                    home_active: true,
                    login_active: true,
                    loginError: 'Invalid credentials!'
                });
                // res.redirect('back');
            }
        })

    },
}

// enables to export controller object when called in another .js file
module.exports = loginController;