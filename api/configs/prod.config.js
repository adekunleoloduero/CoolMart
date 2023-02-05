require('dotenv').config();


const prod = {
    PORT: process.env.PORT || 3050,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
}


module.exports = prod;