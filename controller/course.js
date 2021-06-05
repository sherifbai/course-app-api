const Course = require('../models/course')
const User = require('../models/user')


exports.createCourse = async (req, res, next) => {
    
    if (!req.file) {
        const error = new Error('File failed')
        error.statusCode = 422
        throw error
    }
  
    const title = req.body.title
    const price = req.body.price

    const imgUrl = req.file.path.replace(/\\/g, "/")

    try {
        const course = new Course({
            title: title,
            price: price,
            imgUrl: imgUrl,
            userId: req.userId
        })

        const savedCourse = await course.save()

        res.status(201).json({
            success: true,
            message: 'Course was created successfully!!!',
            data: savedCourse
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
