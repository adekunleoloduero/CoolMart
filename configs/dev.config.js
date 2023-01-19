require('dotenv').config();


const dev = {
    PORT: process.env.PORT || 3050,
    DATABASE_URL: process.env.DATBASE_URL || ''
}


module.exports = dev