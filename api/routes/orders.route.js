const router = require('express').Router();
const { orderController } = require('../controllers/index');
const { authenticateUser, authorizeAdminOnly, authorizeUserOrAdmin } = require('../middleware/auth.middleware');


//Create a order
router.post('/create', authenticateUser, orderController.createOrder);



//View all orders
router.get('/', authenticateUser, authorizeAdminOnly, orderController.getOrders);


//Get user orders
router.get('/:userId', authenticateUser, authorizeUserOrAdmin, orderController.getUserOrders);


//View an order in details
router.get('/view-details/:orderId/:userId', authenticateUser, authorizeUserOrAdmin, orderController.viewOrderDetails)

//Update an order
router.patch('/update/:id', authenticateUser, authorizeAdminOnly, orderController.updateOrder);


//Delete an order
router.delete('/delete/:id', authenticateUser, authorizeAdminOnly, orderController.deleteOrder);


//Processing order
router.get('/processing_order', authenticateUser, orderController.processingOrder);


module.exports = router;

