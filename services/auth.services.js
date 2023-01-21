const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');




const signUp = async(payload) => {
    let response;

    //Check if the user is already registered
    const oldUser = await userModel.findOne({ email: payload.email });
    if (oldUser) {
       response = { 
            status: false, 
            message: 'This email is already registered. Please, provide a different email.'
        }
        return response;
    }
    
    //If user has not registered before, proceed
    const user = await userModel.create(payload);

    const { password, ...others } = user._doc; //Remove password from user object

    response = { status: true, user: others, message: 'Thanks for registering.' }
    return response;
}


const signIn = async(payload) => {
    let response;

    //Check whether the given email is registed.
    const user = await userModel.findOne({ email: payload.email });
    if (!user) {
        response = { status: false, message: 'Invalid email'}
        return response;
    }

    //If email is registered then validate the password
    const isValidPassword = await user.validatePassword(payload.password);
    if (!isValidPassword) {
        response = { status: false, message: 'Invalid password' }
        return response;
    }

    const { _id, email, isAdmin } = user;
    const tokenObject = { _id, email, isAdmin };

    const token = jwt.sign(tokenObject, config.JWT_SECRET, { expiresIn: '1hr'})

    const { password, ...others } = user._doc; //Remove password from user object

    response = { status: true, user: others, token };
    return response;
}


module.exports = {
    signUp,
    signIn
}