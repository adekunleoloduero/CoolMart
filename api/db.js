const mongoose = require('mongoose');
const config = require('./configs/config');



class DatabaseConnection {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to database successfully.');
        })
        .catch((err) => console.log(`Failed to connect to database: ${err}`));
    }
}



module.exports = new DatabaseConnection();