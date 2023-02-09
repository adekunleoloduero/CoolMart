const orderModel = require('../models/order.model');


const createOrder = async(payload) => {
    const order = await orderModel.create(payload);
    return order;
}


const getOrders = async() => {
    const orders = await orderModel.find();
    return orders;
}


const getUserOrders = async(userId) => {
    const orders = await orderModel.find({ user: userId});
    return orders;
}


const viewOrderDetails = async (orderId, customerId) => {
    const order = await orderModel.findOne({_id: orderId, user: customerId})
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
    viewOrderDetails,
    updateOrder,
    deleteOrder
}