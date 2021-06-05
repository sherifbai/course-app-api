const { Router } = require('express')

const authController = require('../controller/auth')

const router = Router()

router.post('/signup', authController.signUp)

module.exports = router
