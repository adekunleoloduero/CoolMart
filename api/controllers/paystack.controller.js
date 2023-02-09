const _ = require("lodash");
const { orderServices } = require('../services/index');
const request = require('request');
const orderModel = require('../models/order.model');
const paymentModel = require('../models/payment.model');


//Paystack payment configurations
const { initializePayment, verifyPayment } = require('../configs/paystack.config')(request);



const initializePaymentOnPaystack = async (req, res, next) => {
    //Get details of the order to be paid for
    let order;
    const orderId = req.params.orderId;
    const userId = req.user._id;
    try {
        order = await orderServices.viewOrderDetails(orderId, userId);
    } catch(err) {
        next(err);
    }

    const form = {
        amount: order.amount,
        email: order.user.email,
        metadata: {
            firstname: order.user.firstname,
            lastname: order.user.lastname,
            address: order.user.address,
        }
    }
  
    form.amount *= 100;
    initializePayment(form, (error, body) => {
        if (error) {
            //Handle errors
            console.log(error);
            return;
       }
        response = JSON.parse(body);
        res.json(response.data.authorization_url);
        //res.redirect(response.data.authorization_url)
    });
}


const verifyPaymentOnPaystack = async (req, res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error, body)=> {
        if(error){
            console.log(error)
            return;
        }
        
        const response = JSON.parse(body);
        
        const data = _.at(response.data, 
            ['reference', 'amount', 'email', 
            'metadata.firstname', 
            'metadata.lastname', 
            'metadata.address'
        ]);

        [reference, amount, email, firstname, lastname, address] = data;
        const fullname = `${firstname} ${lastname}`;
        let paymentData = {reference, fullname, amount, email, address};
        paymentData.amount = amount / 100;

        //Persit payment in the database and return data to be included in receipt
        const payment = new paymentModel(paymentData);
        payment.save().then((payment) => {
            if (payment) {
                res.redirect('/paystack/receipt/'+ payment._id);
            }
        }).catch((err)=>{
            console.log(err);
        })
    })
}


const confirmPayment = async (req, res, next) => {
    const paymentId = req.params.id;

    try {
        const payment = await paymentModel.findById(paymentId);
        if (payment) {
            const { reference, fullname, email, amount, address, createdAt } = payment._doc;
            const data = {
                reference,
                fullname,
                email,
                amount,
                address,
                paidOn: createdAt
            }
            res.render('payment_receipt', data);
        } else {
            res.render("Payment_failed");
        }
    } catch(err) {
        next(err)
    }
}


module.exports = {
    initializePaymentOnPaystack,
    verifyPaymentOnPaystack,
    confirmPayment
}