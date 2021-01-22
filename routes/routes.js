// import module `express`
const database = require('../models/db.js');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');
const registerController = require('../controllers/registerController.js');
const dashboardController = require('../controllers/dashboardController.js');
const loginController = require('../controllers/loginController.js');
const doc_directoryController = require('../controllers/doc_directoryController.js');
const appointmentController = require('../controllers/appointmentController.js');
const adminController = require('../controllers/adminController.js');

//form validation
const validation = require('../helpers/validation.js');
const profileController = require('../controllers/profileController.js');
const accountController = require('../controllers/accountController.js');
const hp_directoryController = require('../controllers/hp_directoryController.js');
const healthprogramsController = require('../controllers/healthprogramsController.js');
const aboutController = require('../controllers/aboutController.js');

const app = express();

//Init Cookie and Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Init Sessions
app.use(session({
  key: 'user_sid', //user session id
  secret: 'initative',
  resave: false,
  saveUninitialized: true,
  store: database.sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 Day.
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// call function getIndex when client sends a request for '/' defined in routes.js
// add routes here

// register controller
app.get('/register', registerController.getRegister);
app.post(
  '/register',
  validation.registerValidation(),
  registerController.postRegister
);

// landing & login controller
app.get('', controller.getLanding);
app.get('/', controller.getLanding);
app.post('/', loginController.postLogIn);
//app.get('/logout', controller.getLogOut);

//about controller
app.get('/about', aboutController.getAbout);

//dashboard controller
app.get('/dashboard', dashboardController.getDashboard);

//profile controller
app.get('/profile', profileController.getProfile);
app.post('/profile/deleteapp', appointmentController.deleteAppointment);
app.get('/profile/deleteapp', function (req, res) {
  req.logout;
  req.session.destroy(function (err) { });
  res.redirect('/');
});

//account controller
app.get('/account', accountController.getAccount);
app.post('/updateProfile', accountController.updateProfile);
app.post('/updateMedHis', accountController.updateMedHis);

//appointment controller
app.get('/appointments', appointmentController.getAppointment);
app.post('/appointments', appointmentController.postAppointment);
app.get('/reschedule-appointments/', appointmentController.reschedAppointment);
app.post('/reschedule-appointments/', appointmentController.postreschedAppointment);

//add health program controller
app.get('/add_healthprogram', healthprogramsController.getHealthProgramsAdd);

// health program controller
app.get('/healthprograms', hp_directoryController.getHealthPrograms);
app.get('/healthprograms/fail', hp_directoryController.getHealthProgramsFail);
app.post('/healthprograms', loginController.postLogIn);
app.post('/healthprograms/modal', hp_directoryController.loginHealthProgram);
app.post('/registerhealth/:hpId/status', hp_directoryController.postUserProgram);
app.post('/canceluserhealth/:hpId/status', hp_directoryController.cancelProgram);
app.get('/registerhealth/:hpId/status', function (req, res) {
  req.logout;
  req.session.destroy(function (err) { });
  res.redirect('/');
});
app.get('/canceluserhealth/:hpId/status', function (req, res) {
  req.logout;
  req.session.destroy(function (err) { });
  res.redirect('/');
});

// admin controller
app.get('/adminhp', adminController.getHP);
app.get('/admindoc', adminController.getDoctors);
app.post('/admindoc/delete', adminController.deleteDoctor);
app.get('/admindoc/delete', function (req, res) {
  req.logout;
  req.session.destroy(function (err) { });
  res.redirect('/');
});
app.get('/addhp', adminController.addHP);
app.post('/adminfilter', adminController.getFilter);
app.post('/addhp',
  validation.programValidation(),
  adminController.postaddHP);
app.get('/editHP/data/:hpId', adminController.getPopulatedEditProgram);
app.post('/editHP/:hpId',
  validation.programValidation(),
  adminController.postEditProgram);
app.post('/deleteHP/:hpId', adminController.deleteHP);
app.get('/participants', adminController.getParticipants);
app.post('/participants', adminController.postParticipants);
app.post('/remove', adminController.removeParticipants);
// app.get('/deleteHP/:hpId', function (req, res) {
//   req.logout;
//   req.session.destroy(function (err) { });
//   res.redirect('/');
// });
app.get('/adddoc', adminController.addDoctor);
app.post('/adddoc', adminController.postaddDoctor);

//logout
app.get('/logout', function (req, res) {
  req.logout;
  req.session.destroy(function (err) { });
  res.redirect('/');
});

// doctors directory controller
app.get('/doctors', doc_directoryController.getDocDirectory);
app.post('/doctors', loginController.postLogIn);
app.post('/filter', doc_directoryController.getFilter);

// enables to export app object when called in another .js file
module.exports = app;
