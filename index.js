const express = require('express');
const config = require('./configs/config');
const router = require('./routes/index');



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Routes
app.use('/api/auth', router.authRouter);
app.use('/api/users', router.userRouter);
app.use('/api/products', router.productRouter);
app.use('/api/orders', router.orderRouter);
app.use('/api/cart', router.cartRouter);


//Home route
app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to the homepage' });
});



module.exports = app;

