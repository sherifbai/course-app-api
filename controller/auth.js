const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.signUp = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const errors = validationResult(req)
    
    if (errors.isEmpty()) {
        const error = new Error('Validation failed')
        error.statusCode = 422
        throw error
    }

    try {
        const hashedPW = await bcrypt.hash(password, 12)

        const user = new User({
            email: email,
            password: hashedPW,
            cart: { items: [] }
        })  

        const savedUser = await user.save()

        res.status(201).json({
            success: true,
            message: 'User created!!!',
            data: savedUser
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.signIn = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed')
        error.statusCode = 422
        throw error
    }


    try {
        const user = await User.findOne({email: email})

        if (!user) {
            const error = new Error('Email not founded!!!')
            error.statusCode = 404
            throw error
        }

        const isEqual = await bcrypt.compare(password, user.password)

        if (!isEqual) {
            const error = new Error('Wrong password!!!')
            error.statusCode = 422
            throw error
        }

        const token = jwt.sign(
            {
                email: email,
                userId: user._id.toString()
            },
            "Sherif'sSecretKey",
            { expiresIn: '24h' }
        )

        res.status(200).json({
            success: true,
            message: 'User logged in!',
            token: token,
            data: null
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
