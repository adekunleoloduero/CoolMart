require('dotenv').config();


const dev = {
    PORT: process.env.PORT || 3050,
    DATABASE_URL: process.env.DEV_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PAYSTACK_SECRET: process.env.PAYSTACK_SECRET
}


module.exports = dev;