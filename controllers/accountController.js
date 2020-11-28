const db = require('../models/db');
const User = require('../models/UserModel');
const moment = require('moment');

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
}

// enables to account controller object when called in another .js file
module.exports = accountController;