const router = require('express').Router();
const { userController } = require('../controllers/index');




//Get all users
router.get('/', userController.getUsers);


//Get user by ID
router.get('/:id', userController.getUserById);


//Update user profile
router.put('/update/:id', userController.updateUserProfile);


//Delete user
router.delete('/delete/:id', userController.deleteUser);


module.exports = router;

