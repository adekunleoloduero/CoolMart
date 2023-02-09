const router = require('express').Router();
const { cartController } = require('../controllers/index');
const { authenticateUser, authorizeAdminOnly } = require('../middleware/auth.middleware');


//Create a cart
router.post('/create', authenticateUser, cartController.createCart);



//View all carts
router.get('/', authenticateUser, authorizeAdminOnly, cartController.getCarts);


//Get user cart
router.get('/view-cart', authenticateUser, cartController.getUserCart);


//Update cart
router.patch('/update/:id', authenticateUser, cartController.updateCart);


//Delete cart
router.delete('/clear/:id', authenticateUser, cartController.deleteCart);


module.exports = router;

