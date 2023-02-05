const development = require('./dev.config');
const production = require('./prod.config');
const test = require('./test.config')

const env = process.env.NODE_ENV;


const config = {
    development,
    production,
    test
}


module.exports = config[env];



