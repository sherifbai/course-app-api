const { Router } = require('express')


const orderController = require('../controller/order')
const isAuth = require('../middleware/is-auth')


const router = Router()


router.get('/:orderId', isAuth, orderController.getOrder)
router.get('/', isAuth, orderController.getOrders)
router.post('/add', isAuth, orderController.createOrder)
router.delete('/delete/:orderId', orderController.deleteOrder)


module.exports = router
