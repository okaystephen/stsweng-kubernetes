const { check, body } = require('express-validator');
const User = require('../models/UserModel');

const validation = {
    registerValidation: function () {
        return[
            check('email')
            .isEmail()
                .withMessage('Please enter a valid email address.')
                .bail()
                .trim()
                .normalizeEmail()
                .custom(async value => {
                    // check if email is already used
                    const data = await User.findOne({
                        email: value,
                    }).exec();
                    // reject if a record is found
                    if (data) return Promise.reject();
                })
                .withMessage('Email address is already in use.'),
            check('password')
                .isLength({ min: 8 })
                .withMessage('Password should contain at least 8 characters.')
                .notEmpty()
                .withMessage('Please enter a password.'),
            check('passwordConfirm')
                .custom((value, { req }) => value === req.body.password)
                .withMessage('Passwords do not match.')
                .notEmpty()
                .withMessage('Please enter a password.'),
            check('fname')
                .trim()
                .notEmpty()
                .withMessage('First name is required.')
                .bail()
                .matches(/^[A-Za-z\s]+$/)
                .withMessage('First name should not contain number/s.')
                .trim(),
            check('lname')
                .trim()
                .notEmpty()
                .withMessage('Last name is required.')
                .bail()
                .matches(/^[A-Za-z\s]+$/)
                .withMessage('Last name should not contain number/s.')
                .trim(),
            check('mname')
                .trim()
                .matches(/^$|^[\sA-Za-z\s]+$/)
                .withMessage('Middle name should not contain number/s.')
                .trim(),
            check('homeAdd')
                .trim()
                .notEmpty()
                .withMessage('Home Address is required.')
                .trim(),
            check('date')
                .notEmpty()
                .withMessage('Empty field. Please enter a date.')
                .custom((value, { req, location, path }) => {
                    var [year, month, day] = value.split('-');
                    var input = Date.UTC(
                        Number(year),
                        Number(month) - 1, // parameter month starts at 0
                        Number(day),
                    );
                    var now = Date.now();

                    if(input > now){
                        throw new Error("Invalid date.")
                    }

                    return true;
                    
                }),
            check('phone')
                .trim()
                .isMobilePhone('en-PH')
                .withMessage('Please enter a valid PH number.')
                .trim(),
            check('otherAnswer')
                .trim()
                .if(body('sex').exists())
                .if(
                    (value, { req }) =>
                        req.body.sex == 'Others'
                )
                .notEmpty()
                .withMessage('Empty field.'),
                
            check('eContactPerson')
                .trim()
                .notEmpty()
                .withMessage('Contact Person Name is required.')
                .bail()
                .matches(/^[A-Za-z\s]+$/)
                .withMessage('Contact Person Name should not contain number/s.')
                .trim(),
            check('eContactNum')
                .trim()
                .custom((value, { req }) => value != req.body.phone)
                .withMessage('Phone Number and Emergency Contact Number should not match.')
                .isMobilePhone('en-PH')
                .withMessage('Please enter a valid PH number.')
                .trim(),
            check('relationship')
                .trim()
                .notEmpty()
                .withMessage('Empty field.')
                .bail()
                .matches(/^[A-Za-z\s]+$/)
                .withMessage('Should not contain number/s.')
                .trim(),
            check('medprob_other')
                .trim()
                .if(body('medprob').exists())
                .if(
                    (value, { req }) =>
                        req.body.medprob == 'Others' ||
                        req.body.medprob.includes('Others'),
                )
                .notEmpty()
                .withMessage('Empty field.')
                .customSanitizer(value => value.split(',')),
            check('medprob_other.*').trim(),

        ]
    },

    programValidation: function (){
        return[
            check('hp_name')
                .notEmpty()
                .withMessage('Health Program name is required.'),
            check('hp_cap')
                .notEmpty()
                .withMessage('Required field.'),
            check('hp_startdate')
                .notEmpty()
                .withMessage('Start date is required.')
                .custom((value, { req, location, path }) => {
                    var [year, month, day] = value.split('-');
                    var input = Date.UTC(
                        Number(year),
                        Number(month) - 1, // parameter month starts at 0
                        Number(day),
                    );
                    var now = Date.now();

                    if(input < now){
                        throw new Error("Please enter a start date that comes after the date today.")
                    }

                    return true;
                    
                }),
            check('hp_enddate')
                .notEmpty()
                .withMessage('End date is required.')
                .custom((value, { req, location, path }) => {
                    var [year, month, day] = req.body.hp_startdate.split('-');

                    var input_start = Date.UTC(
                        Number(year),
                        Number(month) - 1, // parameter month starts at 0
                        Number(day),
                    );
                    
                    var [year, month, day] = value.split('-');

                    var input_end = Date.UTC(
                        Number(year),
                        Number(month) - 1, // parameter month starts at 0
                        Number(day),
                    );

                    if(input_end < input_start){
                        throw new Error("Invalid end date. Please enter a date that is after or equal the start date.")
                    }

                    return true;
                    
                }),
            check('hp_starttime')
                .notEmpty()
                .withMessage('Start time is required.')
                .bail()
                .custom((value, { req, location, path }) => {
                    var [year, month, day] = req.body.hp_startdate.split('-');
                    var input = Date.UTC(
                        Number(year),
                        Number(month) - 1, // parameter month starts at 0
                        Number(day),
                    );
                    var now = Date.now();

                    // get system local time
                    var d = new Date();
                    var m = d.getMinutes();
                    var h = d.getHours();
                    if (h == '0') { h = 24}

                    var currentTime = h+"."+m;

                     //input start time
                    var start_time =  value.split(":");
                    var hour_start = start_time[0];
                    if(hour_start == '00') {hour_start = 24}
                    var min_start = start_time[1]

                    var startTime = hour_start+"."+min_start

                    if(startTime < currentTime){
                        if(input < now){
                            throw new Error("Invalid start time. Start time is pass the current time.")
                        }
                    }

                    return true;
                    
                }),
            check('hp_endtime')
                .notEmpty()
                .withMessage('End time is required.')
                .custom((value, { req, location, path }) => {
                     //input start time
                    var start_time =  req.body.hp_starttime.split(":");
                    var hour_start = start_time[0];
                    if(hour_start == '00') {hour_start = 24}
                    var min_start = start_time[1]

                    var startTime = hour_start+"."+min_start

                     //input end time
                    var end_time =  req.body.hp_endtime.split(":");
                    var hour_end = end_time[0];
                    if(hour_end == '00') {hour_end = 24}
                    var min_end = end_time[1]
            
                    var endTime = hour_end+"."+min_end
                    
                    if(endTime < startTime){
                        throw new Error("Invalid end time. End time is pass the start time.")
                    }

                    return true;
                    
                }),
            check('hp_location')
                .notEmpty()
                .withMessage('Location is required.'),
            check('hp_description')
                .notEmpty()
                .withMessage('Description is required.'),
        ]
    }
}

module.exports = validation;