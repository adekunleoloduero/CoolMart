const router = require('express').Router();
const { orderController } = require('../controllers/index');
const { authenticateUser, authorizeAdminOnly, authorizeUserOrAdmin } = require('../middleware/auth.middleware');


//Create a order
router.post('/create', authenticateUser, orderController.createOrder);



//View all orders
router.get('/', authenticateUser, authorizeAdminOnly, orderController.getOrders);


//Get user orders
router.get('/view/:userId', authenticateUser, authorizeUserOrAdmin, orderController.getUserOrders);


//Update an order
router.put('/update/:id', authenticateUser, authorizeAdminOnly, orderController.updateOrder);


//Delete an order
router.delete('/clear/:id', authenticateUser, authorizeAdminOnly, orderController.deleteOrder);


//Processing order
router.get('/processing_order', authenticateUser, orderController.processingOrder);


module.exports = router;

