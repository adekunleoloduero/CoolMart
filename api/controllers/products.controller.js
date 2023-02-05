const { productServices } = require('../services/index');



const addProduct = async(req, res, next) => {
    const payload = req.body;
    try {
        const response = await productServices.addProduct(payload);
        return res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const getProducts = async(req, res, next) => {
    const query = req.query;
    try {
        const response = await productServices.getProducts(query);
        return res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const getProductById = async(req, res, next) => {
    const id = req.params.id;
    try {
        const response = await productServices.getProductById(id);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const updateProduct = async(req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const response = await productServices.updateProduct(id, body);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}


const deleteProduct = async(req, res, next) => {
    const id = req.params.id;
    try {
        const response = await productServices.deleteProduct(id);
        res.status(200).json(response);
    } catch(err) {
        next(err);
    }
}



module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
