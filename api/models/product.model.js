const { Schema, model } = require('mongoose');



const productSchema = new Schema({
    title: {
        type: String, 
        required: true, 
        unique: true
    },
    desc: {
        type: String, 
        required: true
    },
    img: {
        type: String, 
        required: true
    },
    category: Array,
    size: String,
    color: String,
    price: {
        type: Number, 
        required: true
    }
}, {
    timestamps: true
});


module.exports = model('products', productSchema);