const { Router } = require('express')

const courseController = require('../controller/course')
const isAuth = require('../middleware/is-auth')

const router = Router()

router.post('/add', isAuth, courseController.createCourse)

module.exports = router
