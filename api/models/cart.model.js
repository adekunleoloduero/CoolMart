const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
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
}, {
    timestamps: true
});


module.exports = model('carts', cartSchema);