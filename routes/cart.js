const { Router } = require('express')

const isAuth = require('../middleware/is-auth')
const cartController = require('../controller/cart')

const router = Router()

router.post('/add/:courseId', isAuth, cartController.addToCart)

module.exports = router
