const productModel = require('../models/product.model');



const addProduct = async(payload) => {
    const product = await productModel.create(payload);
    return payload;
}


const getProducts = async(query) => {
    let products;
    if (query.newest) {
        products = await productModel.find().sort({ createdAt: -1 }).limit(20);
    } else if (query.category) {
        products = await productModel.find({ category: { $in: query.category}}).limit(20);
    } else {
        products = await productModel.find().limit(20);
    }

    return products;
}


const getProductById = async(id) => {
    const product = await productModel.findById(id);
    return product;
}


const updateProduct = async(id, body) => {
    const product = await productModel.findByIdAndUpdate(id, { $set: body}, { new: true });
    return product;
}

const deleteProduct = async(id) => {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) return { message: 'Item already deleted' };
    return { message:  'Item deleted successfully.'};
}


module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}