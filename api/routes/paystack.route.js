const router = require('express').Router();
const { paystackPaymentController } = require('../controllers/index');
const { authenticateUser} = require('../middleware/auth.middleware');
const { initializePaymentOnPaystack, verifyPaymentOnPaystack, confirmPayment } = paystackPaymentController;


//Verify payment on paystack
router.get('/callback', verifyPaymentOnPaystack);

//Initialize payment on paystack
router.post('/pay/:orderId', authenticateUser, initializePaymentOnPaystack);


//Confirm payment
router.get('/receipt/:id', confirmPayment);






module.exports = router;

