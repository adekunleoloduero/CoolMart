const router = require('express').Router();
const controllers = require('../controllers/index');



//Get all products
router.get('/', controllers.productController.getProducts);


//Get a product by ID
router.get('/:id', controllers.productController.getProductById);


//Update a product
router.put('/update/:id', controllers.productController.updateProduct);


//Delete a product
router.delete('/delete/:id', controllers.productController.deleteProduct);


module.exports = router;

