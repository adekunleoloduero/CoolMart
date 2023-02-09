const cartModel = require('../models/cart.model');



const createCart = async(payload) => {
    const cart = await cartModel.create(payload);
    return cart;
}


const getCarts = async() => {
    const carts = await cartModel.find()
    .populate("user", "-password")
    .populate({
        path: "products",
        populate: {
            path: "product"
        }
    }).limit(5);
    return carts;
}


const getUserCart = async (userId) => {
    const cart = await cartModel.find({ user: userId})
    .populate("user", "-password")
    .populate({
        path: "products",
        populate: {
            path: "product"
        }
    });
    return cart;
}


const updateCart = async(id, body) => {
    const cart = await cartModel.findByIdAndUpdate(id, { $set: body}, { new: true });
    return cart;
}

const deleteCart = async(id) => {
    const deletedCart = await cartModel.findByIdAndDelete(id);
    if (!deletedCart) return { message: 'Cart is empty.' };
    return { message:  'Your cart is not empty.'};
}


module.exports = {
    createCart,
    getCarts,
    getUserCart,
    updateCart,
    deleteCart
}