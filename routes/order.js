const { Router } = require('express')

const orderController = require('../controller/order')
const isAuth = require('../middleware/is-auth')

const router = Router()

router.post('/add', isAuth, orderController.createOrder)

module.exports = router
