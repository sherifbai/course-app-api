const User = require('../models/user')
const Order = require('../models/order')


exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()

        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.createOrder = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).populate('items')

        const course = user.cart.items.map(el => {
            return {quantity: el.quantity, courseId: el.courseId}
        })

        const order = new Order({
            user: {
                email: req.email,
                userId: req.userId
            },
            courses: course
        })

        const savedOrder = await order.save()
        
        await user.cleanCart()

        res.status(201).json({
            success: true,
            message: 'Order created successfully!!!',
            data: savedOrder
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.orderId

    try {
        await Order.findByIdAndRemove(orderId)

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully!!!',
            data: null
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
