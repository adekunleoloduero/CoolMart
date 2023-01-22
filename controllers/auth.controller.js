const { authServices } = require('../services/index');
require('dotenv').config();



const signUp = async(req, res, next) => {
    const payload = req.body;
    console.log(payload);
    try {
        const response = await authServices.signUp(payload);
        if (!response.status) {
            return res.status(400).json(response);
        } else {
            return res.status(201).json(response);    
        }
    } catch(error) {
        next(error);
    }
}


const signIn = async(req, res, next) => {
    const payload = req.body;
    try {
        const response = await authServices.signIn(payload);
        if (!response.status) {
            return res.status(400).json(response);
        } else {
            return res.cookie("access_token", response.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'prod'
            }).status(200).json({ message: "Logged in successfully."});
        }
    } catch(error) {
        next(error);
    }
}


const logOut = async(req, res, next) => {
    return res.clearCookie('access_token')
    .status(200).json({ message: 'Successfully logged out.' });
}



module.exports = {
    signUp,
    signIn,
    logOut
}