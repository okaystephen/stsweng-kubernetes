const doc_directoryController = {
    getDocDirectory: function (req, res){
        res.render('doc_directory', {
            doctors_active: true,
            active_session: (req.session.user && req.cookies.user_sid),
            active_user: req.session.user,
            title: 'Doctors | DoloMed'
        })
    },
}

module.exports = doc_directoryController;