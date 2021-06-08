const { Router } = require('express')


const courseController = require('../controller/course')
const isAuth = require('../middleware/is-auth')


const router = Router()


router.post('/add', isAuth, courseController.createCourse)
router.put('/update/:courseId', isAuth, courseController.updateCourse)
router.delete('/delete/:courseId', isAuth, courseController.deleteCourse)


module.exports = router
