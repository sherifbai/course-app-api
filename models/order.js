const mongoose = require('mongoose')

const Order = require('./order')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    course: [{
        courseId: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
        quantity: {type: Number, required: true}
    }],
    user: {
        userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        email: {type: String, required: true}
    }
})

module.exports = mongoose.model('Order', orderSchema)
