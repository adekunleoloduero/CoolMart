const router = require('express').Router();
const { authController } = require('../controllers/index');


//Sign up
router.post('/signup', authController.signUp);


//Sign in
router.post('/signin', authController.signIn);

//Logout
router.post('/logout', authController.logOut);

//Request password request link
router.post('/reset-password', authController.initiatePasswordReset);


router.get('/:userId/:token', authController.getResetToken)

//Update password
router.patch('/change-password', authController.changePassword);



module.exports = router;

