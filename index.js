const express = require('express');
const config = require('./configs/config');



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to the homepage' });
});



module.exports = app;

