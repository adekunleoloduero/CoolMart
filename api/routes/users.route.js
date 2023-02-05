const router = require('express').Router();
const { userController } = require('../controllers/index');
const { authenticateUser, authorizeUserOrAdmin, authorizeAdminOnly } = require('../middleware/auth.middleware');





//Get all users
router.get('/', authenticateUser, authorizeAdminOnly, userController.getUsers);


//Get user by ID
router.get('/find/:id', authenticateUser, authorizeAdminOnly, userController.getUserById);


//Update user profile
router.put('/update/:id', authenticateUser, authorizeUserOrAdmin, userController.updateUserProfile);


//Delete user
router.delete('/delete/:id', authenticateUser, authorizeUserOrAdmin, userController.deleteUser);


//Get statistics of users that registered for each month in the current year
router.get('/stats', authenticateUser, authorizeAdminOnly, userController.getUsersStats);


module.exports = router;

