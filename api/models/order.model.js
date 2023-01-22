const { Schema, model } = require('mongoose');


const orderSchema = new Schema({
    userId: {type: String,  required: true},
    products: [
        {
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
});


module.exports = model('orders', orderSchema);