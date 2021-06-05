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

exports.updateCourse = async (req, res, next) => {
    const courseId = req.params.courseId

    const title = req.body.title
    const price = req.body.price

    let imgUrl = req.body.image

    if (req.file) {
        imgUrl = req.file.path.replace(/\\/g, "/")
    }
    if (!imgUrl) {
        const error = new Error('No picked file')
        error.statusCode = 422
        throw error
    }
    const course = await Course.findById(courseId)

    course.title = title
    course.price = price
    course.imgUrl = imgUrl

    const savedCourse = await course.save()

    res.status(200).json({
        success: true,
        message: 'Course updated successfully!!!',
        data: savedCourse
    })
}
