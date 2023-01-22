const dev = require('./dev.config');

const env = process.env.NODE_ENV;


const config = {
    dev,
}


module.exports = config[env];



