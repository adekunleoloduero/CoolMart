const { cartServices } = require('../services/index');



const createCart = async (req, res, next) => {
    const payload = req.body;
    try {
        const response = await cartServices.createCart(payload);
        return res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const getCarts = async (req, res, next) => {
    try {
        const response = await cartServices.getCarts();
        return res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const getUserCart = async(req, res, next) => {
    const userId = req.user._id;
    try {
        const response = await cartServices.getUserCart(userId);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const updateCart = async(req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const response = await cartServices.updateCart(id, body);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const deleteCart = async(req, res, next) => {
    const id = req.params.id;
    try {
        const response = await cartServices.deleteCart(id);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    createCart,
    getCarts,
    getUserCart,
    updateCart,
    deleteCart
}