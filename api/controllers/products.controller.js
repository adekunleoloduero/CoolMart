





const getProducts = async(req, res, next) => {
    return res.status(200).json('Get Products');
}


const getProductById = async(req, res, next) => {
    return res.status(200).json('Get product by Id');
}


const updateProduct = async(req, res, next) => {
    return res.status(200).json('update user profile');
}


const deleteProduct = async(req, res, next) => {
    return res.status(200).json('Delete users');
}



module.exports = {
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
