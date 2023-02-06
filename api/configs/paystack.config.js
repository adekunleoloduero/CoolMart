const config = require('./config');

const paystack = (request) => {
    const PAYSTACK_SECRET = `Bearer ${config.PAYSTACK_SECRET}`;

    //Initializes payment and returns authorizationn URL to complete payment on paystack
    const initializePayment = (form, cb) => {
        const option = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: PAYSTACK_SECRET,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           },
           form
        }
        const callback = (error, response, body)=>{
            return cb(error, body);
        }
        request.post(option, callback);
    }

    //Verifies payment status on paystack platform
    const verifyPayment = (ref, cb) => {
        const option = {
            url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers : {
                authorization: PAYSTACK_SECRET,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           }
        }
        const callback = (error, response, body)=>{
            return cb(error, body);
        }
        request(option, callback);
    }
    return {initializePayment, verifyPayment};
}
module.exports = paystack;