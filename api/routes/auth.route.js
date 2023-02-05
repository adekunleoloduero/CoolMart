const router = require('express').Router();
const { authController } = require('../controllers/index');


//Sign up
router.post('/signup', authController.signUp);


//Sign in
router.post('/signin', authController.signIn);

//Logout
router.post('/logout', authController.logOut);



module.exports = router;

