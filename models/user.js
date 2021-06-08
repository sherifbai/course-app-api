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


userSchema.methods.addToCart = function(course){
    const cartCourseId = this.cart.items.findIndex(el => {
        return el.courseId.toString() === course._id.toString()
    })
    let newQuantity = 1
    const updatedCourse = [...this.cart.items]

    if (cartCourseId >= 0) {
        newQuantity = this.cart.items[cartCourseId].quantity + 1
        updatedCourse[cartCourseId].quantity = newQuantity
    } else {
        updatedCourse.push({
            courseId: course._id,
            quantity: newQuantity
        })
    }

    this.cart = {
        items: updatedCourse
    }

    return this.save()
}


userSchema.methods.deleteFromCart = function(course){
    const cartCourseId = this.cart.items.findIndex(el => {
        return el.courseId.toString() === course._id.toString()
    })
    console.log(cartCourseId)
    let updatedCourse = [...this.cart.items]

    if (updatedCourse[cartCourseId].quantity === 1) {
        updatedCourse = this.cart.items.filter(el => {
            return el.courseId.toString() !== course._id.toString()
        })
    } else {
        updatedCourse[cartCourseId].quantity -= 1
    }

    this.cart = {
        items: updatedCourse
    }

    return this.save()
}


userSchema.methods.cleanCart = function(){
    this.cart = { items: [] }
    return this.save()
}


module.exports = mongoose.model('User', userSchema)
