const development = require('./dev.config');

const env = process.env.NODE_ENV;


const config = {
    development,
}


module.exports = config[env];



