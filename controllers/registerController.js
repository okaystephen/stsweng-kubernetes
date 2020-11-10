// define objects for client request functions for a certain path in the server
const registerController = {
    // render log-in page when client requests '/register' defined in routes.js
    getRegister: function (req, res){
        res.render('register', {
            active_session: (req.session.user && req.cookies.user_sid),
       		active_user: req.session.user,
        });
    },
};

// enables to export controller object when called in another .js file
module.exports = registerController;