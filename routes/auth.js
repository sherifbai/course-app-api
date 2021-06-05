const { Router } = require('express')

const authController = require('../controller/auth')

const router = Router()

router.post('/signup', authController.signUp)
router.post('/signin', authController.signIn)

module.exports = router
