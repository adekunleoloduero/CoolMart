const express = require('express');
const config = require('./configs/config');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
require('dotenv').config();



const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());


//Routes
app.use('/api/auth', router.authRouter);
app.use('/api/users', router.userRouter);
app.use('/api/products', router.productRouter);
app.use('/api/orders', router.orderRouter);
app.use('/api/cart', router.cartRouter);


//Home route
app.get('/api', (req, res) => {
    return res.json({ message: 'Welcome to the homepage' });
});



//Error middleware
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || 'Internal Server Error.';
    console.log({
        status: errStatus,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
    res.status(errStatus).json({message: errMsg });
});


app.get('*', (req, res) => {
    res.status(400).json({ message: 'Page Not Found' });
});



module.exports = app;

