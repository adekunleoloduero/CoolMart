const { Schema, model } = require('mongoose');



const userSchema = new Schema({
    firstname: String,  
    lastname: String,
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    isAdmin: {
        type: Boolean, 
        default: false
    }
}, {
    timestamps: true
});


module.exports = model('users', userSchema);