



const getOrders = async(req, res, next) => {
    return res.status(200).json('Get orders');
}


const getOrderById = async(req, res, next) => {
    return res.status(200).json('Get order by Id');
}


const updateOrder = async(req, res, next) => {
    return res.status(200).json('update order');
}


const deleteOrder = async(req, res, next) => {
    return res.status(200).json('Delete order');
}



module.exports = {
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}