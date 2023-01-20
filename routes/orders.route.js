const router = require('express').Router();
const controllers = require('../controllers/index');



//Get all orders
router.get('/', controllers.orderController.getOrders);


//Get an order by its ID
router.get('/:id', controllers.orderController.getOrderById);


//Update an order
router.put('/update/:id', controllers.orderController.updateOrder);


//Delete an order
router.delete('/delete/:id', controllers.orderController.deleteOrder);


module.exports = router;

