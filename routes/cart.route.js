const router = require('express').Router();
const controllers = require('../controllers/index');



//Get cart by ID
router.get('/:id', controllers.cartController.getCartById);


//Update cart
router.put('/update/:id', controllers.cartController.updateCart);


//Delete cart
router.delete('/clear/:id', controllers.cartController.deleteCart);


module.exports = router;

