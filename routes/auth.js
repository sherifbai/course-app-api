const { Router } = require('express')
const { body } = require('express-validator')

const User = require('../models/user')
const authController = require('../controller/auth')

const router = Router()

router.post('/signup', [
    body('email')
        .isEmail()
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (!userDoc) {
                    return Promise.reject('Email already used!!!')
                }
            })
        }),
    body('password')
        .isLength({min: 5})
        .trim()
        .not()
        .isEmpty()
], authController.signUp)

router.post('/signin', [
    body('email')
        .isEmail()
        .not()
        .isEmpty(),
    body('password')
        .isLength({min: 5})
        .trim()
        .not()
        .isEmpty()
], authController.signIn)

module.exports = router
