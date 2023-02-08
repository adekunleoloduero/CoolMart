const orderModel = require('../models/order.model');


const createOrder = async(payload) => {
    const order = await orderModel.create(payload);
    return order;
}


const getOrders = async() => {
    const orders = await orderModel.find()
    .populate("user", "-password")
    .populate({
        path: "products",
        populate: {
            path: "product"
        }
    });
    return orders;
}


const getUserOrders = async(userId) => {
    const orders = await orderModel.find({ user: userId})
    .populate("user", "-password")
    .populate({
        path: "products",
        populate: {
            path: "product"
        }
    });
    return orders;
}


const getUserOrderById = async (orderId, userId) => {
    const order = await orderModel.findOne({_id: orderId, user: userId})
    .populate("user", "-password")
    .populate({
        path: "products",
        populate: {
            path: "product"
        }
    });
    return order;
}


const updateOrder = async(id, body) => {
    const order = await orderModel.findByIdAndUpdate(id, { $set: body}, { new: true });
    return order;
}

const deleteOrder = async(id) => {
    const deletedOrder = await orderModel.findByIdAndDelete(id);
    if (!deletedOrder) return { message: 'Order already deleted.' };
    return { message:  'The order has been deleted.'};
}


module.exports = {
    createOrder,
    getOrders,
    getUserOrders,
    getUserOrderById,
    updateOrder,
    deleteOrder
}