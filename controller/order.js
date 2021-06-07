const User = require('../models/user')
const Order = require('../models/order')

exports.createOrder = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        
        user.populate('cart.items.courseId').execPopulate()

        const course = user.cart.items.map(el => {
            return {quantity: el.quantity, courseId: el.courseId}
        })

        const order = new Order({
            user: {
                email: req.email,
                userId: req.userId
            },
            course: course
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
        let order = await Order.findById(orderId)
        
        if (order.course[0].quantity === 1) {
            await Order.findByIdAndRemove(orderId)
            order = null
        } else {
            order.course[0].quantity -= 1
            await order.save()
        }


        res.status(200).json({
            success: true,
            message: 'Order deleted successfully!!!',
            data: order
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
