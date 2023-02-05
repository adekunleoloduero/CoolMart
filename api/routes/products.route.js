const router = require('express').Router();
const { productController } = require('../controllers/index');
const { authenticateUser, authorizeAdminOnly } = require('../middleware/auth.middleware');


//Add a new product
router.post('/add_new', authenticateUser, authorizeAdminOnly, productController.addProduct)


//Get all products
router.get('/', productController.getProducts);


//Get a product by ID
router.get('/:id', productController.getProductById);


//Update a product
router.put('/update/:id', authenticateUser, authorizeAdminOnly, productController.updateProduct);


//Delete a product
router.delete('/delete/:id', authenticateUser, authorizeAdminOnly, productController.deleteProduct);


module.exports = router;

