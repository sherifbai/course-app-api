const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.signUp = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

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
        res.status(error.statusCode).json(error);
    }
}
