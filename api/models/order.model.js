const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {type: Number, default: 1}
        }
    ],
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


module.exports = model('orders', orderSchema);