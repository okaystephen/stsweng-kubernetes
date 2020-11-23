const bcrypt = require('bcrypt');
const session = require('express-session');
const sanitize = require('mongo-sanitize');
const database = require('../models/db.js');
const User = require('../models/UserModel');
const loginController = {

    postLogIn: function (req, res) {

        var email = sanitize(req.body.loginemail);
        var password = sanitize(req.body.loginpass);

        database.findOne(User, { email: email }, {}, function (user) {
            if (user) {
                console.log(user);
                bcrypt.compare(password, user.password, function (err, equal) {
                    // console.log(equal)
                    if (equal) {
                        // console.log('Username and password is correct.. Redirecting..');
                        req.session.userid = user._id;
                        console.log('Success!');
                        res.redirect('/');
                    }
                    else {
                        res.render('landing', {
                            // layout: '/layouts/main',
                            title: 'Home | DoloMed',
                            home_active: true,
                            login_active: true,
                            loginError: 'Invalid credentials!'
                        });
                    }
                });
            }
            else {
                res.render('landing', {
                    // layout: '/layouts/main',
                    title: 'Home | DoloMed',
                    home_active: true,
                    login_active: true,
                    loginError: 'Invalid credentials!'
                });
            }
        })

    },
}

// enables to export controller object when called in another .js file
module.exports = loginController;