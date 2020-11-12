const dashboardController = {
    getDashboard: function (req, res){
        res.render('dashboard', {
             active_session: (req.session.user && req.cookies.user_sid),
               active_user: req.session.user,
               title: 'Dashboard'
        })
    }
}

// enables to export controller object when called in another .js file
module.exports = dashboardController;