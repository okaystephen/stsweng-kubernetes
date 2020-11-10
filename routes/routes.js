// import module `express`
const database = require('../models/db.js');
const session = require('express-session');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');
const registerController = require('../controllers/registerController.js');

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



// enables to export app object when called in another .js file
module.exports = app;
