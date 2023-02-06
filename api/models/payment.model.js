const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const paymentSchema = new Schema({
    reference: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    fullname: {
        type: String
    },
    address: {
        type: String
    }
}, {
    timestamps: true
});


module.exports = model('payments', paymentSchema);