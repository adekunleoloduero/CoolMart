const router = require('express').Router();
const { authController } = require('../controllers/index');
const { signUp, signIn } = authController;


//Sign up
router.post('/signup', signUp);


//Sign in
router.post('/signin', signIn);


module.exports = router;

