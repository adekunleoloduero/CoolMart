const authRouter = require('./auth.route');
const userRouter = require('./users.route');
const productRouter = require('./products.route');
const orderRouter = require('./orders.route');
const cartRouter = require('./cart.route');


const router = {
    authRouter,
    userRouter,
    productRouter,
    orderRouter,
    cartRouter
}


module.exports = router;