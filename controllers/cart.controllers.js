




const getCartById = async(req, res, next) => {
    return res.status(200).json('Get cart by Id');
}


const updateCart = async(req, res, next) => {
    return res.status(200).json('update cart');
}


const deleteCart = async(req, res, next) => {
    return res.status(200).json('Delete cart');
}



module.exports = {
    getCartById,
    updateCart,
    deleteCart
}