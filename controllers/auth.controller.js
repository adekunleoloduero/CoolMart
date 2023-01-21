const { authServices } = require('../services/index');



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
            return res.status(200).json(response);
        }
    } catch(error) {
        next(error);
    }
}



module.exports = {
    signUp,
    signIn
}