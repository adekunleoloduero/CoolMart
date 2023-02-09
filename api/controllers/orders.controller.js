const { orderServices } = require('../services/index');



const createOrder = async (req, res, next) => {
    const payload = req.body;
    try {
        const response = await orderServices.createOrder(payload);
        return res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const getOrders = async (req, res, next) => {
    try {
        const response = await orderServices.getOrders();
        return res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const getUserOrders = async(req, res, next) => {
    const userId = req.params.userId;
    try {
        const response = await orderServices.getUserOrders(userId);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const viewOrderDetails = async(req, res, next) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    try {
        const response = await orderServices.viewOrderDetails(orderId, userId);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const updateOrder = async(req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const response = await orderServices.updateOrder(id, body);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const deleteOrder = async(req, res, next) => {
    const id = req.params.id;
    try {
        const response = await orderServices.deleteOrder(id);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const processingOrder = async (req, res, next) => {
    res.render('order_processing_paystack');
}


module.exports = {
    createOrder,
    getOrders,
    getUserOrders,
    viewOrderDetails,
    updateOrder,
    deleteOrder,
    processingOrder
}