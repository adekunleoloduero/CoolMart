const router = require('express').Router();
const { userController } = require('../controllers/index');
const { authenticateUser, authorizeUserOrAdmin, authorizeAdminOnly } = require('../middleware/auth.middleware');





//Get all users
router.get('/', authenticateUser, authorizeAdminOnly, userController.getUsers);


//Get user by ID
router.get('/find/:id', authenticateUser, authorizeAdminOnly, userController.getUserById);


//Update user profile
router.patch('/update/:id', authenticateUser, authorizeUserOrAdmin, userController.updateUserProfile);


//Delete user
router.delete('/delete/:id', authenticateUser, authorizeUserOrAdmin, userController.deleteUser);




module.exports = router;

