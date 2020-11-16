const profileController = {
    // render account page when client requests '/profile' defined in routes.js
    getProfile: function (req, res){
        res.render('profile', {
               active_session: (req.session.user && req.cookies.user_sid),
               active_user: req.session.user,
               title: 'Profile | DoliMed'
        });
    },
}

// enables to profile controller object when called in another .js file
module.exports = profileController;