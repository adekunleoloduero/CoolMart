const app = require('./server');
const config = require('./configs/config');
require('./db'); //Connect to database



app.listen(config.PORT, () => {console.log(`Server is running on port: ${config.PORT}`)});
