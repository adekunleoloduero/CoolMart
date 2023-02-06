const authController = require('./auth.controller');
const userController = require('./users.controller');
const productController = require('./products.controller');
const orderController = require('./orders.controller');
const cartController = require('./cart.controllers');
const paystackPaymentController = require('./paystack.controller')

const controllers = {
    authController,
    userController,
    productController,
    orderController,
    cartController,
    paystackPaymentController
}

module.exports = controllers;