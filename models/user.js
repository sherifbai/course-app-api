const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                courseId: { type: Schema.Types.ObjectId, ref: 'Course'},
                quantity: Number
            }
        ]
    }
})

module.exports = mongoose.model('User', userSchema)
