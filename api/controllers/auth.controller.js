const { authServices } = require('../services/index');
const crypto = require('crypto');
const userModel = require('../models/user.model');
const { sendEmail } = require('../utils/nodemailer');
require('dotenv').config();



const signUp = async(req, res, next) => {
    const payload = req.body;
    try {
        const response = await authServices.signUp(payload);
        if (!response.status) {
            return res.status(400).json(response);
        } else {
            return res.status(201).json(response);    
        }
    } catch(err) {
        next(err);
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
                secure: process.env.NODE_ENV === 'production'
            }).status(200).json({ message: "Logged in successfully."});
        }
    } catch(err) {
        next(err);
    }
}


const logOut = async(req, res, next) => {
    return res.clearCookie('access_token')
    .status(200).json({ message: 'Successfully logged out.' });
}


const initiatePasswordReset = async(req, res, next) => {
    try {
        const buffer = crypto.randomBytes(32);
        const token = buffer.toString("hex");
        const data = {
            email: req.body.email,
            subject: 'PASSWORD RESET REQUEST',
            token
        }
         
        const user = await userModel.findOne({ email: data.email });
    
        if (!user) {
          return res.status(400).json({ message: "Invalid email"});
        }
    
        const name = user.firstname
        data.name = name;
        data.userId = user._id;
        user.resetToken = data.token; //Set re-set token
        user.resetTokenExpiration = Date.now() + 300000; //Set token expiration

        await user.save();
        const mailSent = await sendEmail(data); //Send password re-set link to user email
        
        if (!mailSent) {
            return res.status(400).json({ status: false, message: 'An unexpected error occured.' })
        } else {
            return res.status(200).json({ status: true, message: 'Check your email for the password reset link.'});
        }    
            
    } catch(err) {
        next(err);
    }
}



const getResetToken = async (req, res, next) => {
    const token = req.params.token;
    const user = await userModel.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(403).json({message: 'Invalid or expired link' });
    }

    const {_id, resetToken} = user._doc;
    const data = { userId: _id, resetToken }
    return res.status(200).json(data);
}


const changePassword = async(req, res, next) => {
    const resetToken = req.body.resetToken;
    const userId = req.body.userId;
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword) {
        return res.status(400).json({ message: 'Password confirmation failed' });
    }

    try {
        const user = await userModel.findOne({
          _id: userId,
          resetToken,
          resetTokenExpiration: { $gt: Date.now() },
        });
    
        if (!user) {
          return res.status(400).json({ message: 'Pasword change failed' });
        }
    
        user.password = password;
        user.resetToken = "";
        user.resetTokenExpiration = "";
        await user.save();
    
        res.status(200).json({ message: 'Your password was changed successfully.'});
    } catch(err) {
        next(err);
    }
}



module.exports = {
    signUp,
    signIn,
    logOut,
    initiatePasswordReset,
    getResetToken,
    changePassword
}