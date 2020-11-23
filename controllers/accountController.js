const accountController = {
    // render account page when client requests '/account' defined in routes.js
    getAccount: function (req, res){
        res.render('account', {
               active_session: (req.session.user && req.cookies.user_sid),
               active_user: req.session.user,
               title: 'Account | DoliMed'
        });
    },
}

// enables to account controller object when called in another .js file
module.exports = accountController;