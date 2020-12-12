const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

// import routes module
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

// support json encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set hbs as view engine
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultView: '',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),

    // custom helpers
    helpers: {
      // Use this helper on <input type="radio"> elements to retain option when submitting form data
      check: function (value, input, init) {
        if (!input) input = init;
        return value === input ? ' checked' : '';
      },
      // Use this helper on <input type="checkbox"> elements to retain option when submitting form data
      checkbox: function (value, input) {
        if (input) {
          return input.includes(value) ? ' checked' : '';
        }
      },
      dateFormat: require('handlebars-dateformat'),
      equals: function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      },
      invalid: function(date, options){
        if(Date.now() > date){
          return options.fn(this)
        } else{
          return options.inverse(this)
        }
      }
    },
  }),
);

// define css, img, js, and views as static 
app.use(express.static('public'));
app.use(express.static('views'));

// partials
hbs.registerPartials(__dirname + '/views/partials');

// define css, img, js, and views as static 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// define the paths contained in routes module
app.use('/', routes);

// connects to the database
const url = process.env.MONGO_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(url, options, err => {
  if (err) throw err;
  console.log('Connected at ' + url);
});

app.listen(port, function () {
  console.log('App listening at port ' + port)
});

// Add helpers here