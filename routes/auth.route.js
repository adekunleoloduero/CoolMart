const router = require('express').Router();
const controllers = require('../controllers/index');


//Sign up
router.post('/signup', controllers.authController.signUp);


//Sign in
router.post('/signin', controllers.authController.signIn);


module.exports = router;

