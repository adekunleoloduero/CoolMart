const router = require('express').Router();
const { authController } = require('../controllers/index');
const { signUp, signIn, logOut } = authController;


//Sign up
router.post('/signup', signUp);


//Sign in
router.post('/signin', signIn);

//Logout
router.post('/logout', logOut);



module.exports = router;

