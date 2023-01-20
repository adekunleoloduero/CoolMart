const router = require('express').Router();
const controllers = require('../controllers/index');



//Get all users
router.get('/', controllers.userController.getUsers);


//Get user by ID
router.get('/:id', controllers.userController.getUserById);


//Update user profile
router.put('/update/:id', controllers.userController.updateUserProfile);


//Delete user
router.delete('/delete/:id', controllers.userController.deleteUser);


module.exports = router;

