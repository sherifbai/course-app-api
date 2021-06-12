const User = require('../models/user')
const Course = require('../models/course')


exports.getCarts = async (req, res, next) => {
    try {
        const carts = await User.findOne({_id: req.userId}).populate('items')

        res.status(200).json({
            success: true,
            data: carts
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.addToCart = async (req, res, next) => {
    const courseId = req.params.courseId

    try {
        const course = await Course.findById(courseId)
        const user = await User.findById(req.userId)

        await user.addToCart(course)

        const savedUser = await user.save()

        res.status(200).json({
            success: true,
            message: 'Course added to Cart successfully!!!',
            data: savedUser
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.deleteFromCart = async (req, res, next) => {
    const courseId = req.params.courseId

    try {
        const course = await Course.findById(courseId)
        const user = await User.findById(req.userId)

        await user.deleteFromCart(course)

        const savedUser = await user.save()

        res.status(200).json({
            success: true,
            message: 'Course deleted from Cart successfully!!!',
            data: savedUser
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
