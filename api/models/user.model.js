const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');



const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },  
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "customer"], 
        default: "customer"
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    }
}, {
    timestamps: true
});


//Encrypt password before saving to the DB
userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});


//Validate password
userSchema.methods.validatePassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
}


module.exports = model('users', userSchema);