require('dotenv').config();


const dev = {
    PORT: process.env.PORT || 3050,
    DATABASE_URL: process.env.LOCAL_MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    GOOGLE_0AUTH_CLIENT_ID: process.env.GOOGLE_0AUTH_CLIENT_ID,
    GOOGLE_0AUTH_CLIENT_SECRET: process.env.GOOGLE_0AUTH_CLIENT_SECRET,
    GOOGLE_0AUTH_REFRESH_TOKEN: process.env.GOOGLE_0AUTH_REFRESH_TOKEN,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD
}


module.exports = dev;