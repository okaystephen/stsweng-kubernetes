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
            check('mname')
                .trim()
                .notEmpty()
                .withMessage('Middle name is required.')
                .bail()
                .matches(/^[A-Za-z\s]+$/)
                .withMessage('Middle name should not contain number/s.')
                .trim(),
            check('lname')
                .trim()
                .notEmpty()
                .withMessage('Last name is required.')
                .bail()
                .matches(/^[A-Za-z\s]+$/)
                .withMessage('Last name should not contain number/s.')
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
    }
}

module.exports = validation;