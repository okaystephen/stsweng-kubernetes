const db = require('../models/db');
const mongoose = require('mongoose');
const User = require('../models/UserModel');

const aboutController = {
    getAbout: function (req, res) {
        if (req.cookies.user_sid && req.session.user) {
            if(req.session.type == 'admin'){
                res.render('about', {
                    layout: 'main',
                    title: 'About | DoloMed',
                    home_active: true,
                    admin_active: true,
                })
            }
            else{
                res.render('about', {
                    layout: 'main',
                    title: 'About | DoloMed',
                    home_active: true,
                    user_active: true,
                })
            }
        }
        else {
            res.render('about', {
                layout: 'main',
                title: 'About | DoloMed',
                home_active: true,
                user_active: false,
            })
        }
    },
}

// enables to export controller object when called in another .js file
module.exports = aboutController;