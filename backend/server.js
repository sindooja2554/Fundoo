/**
 * @description This is the file where all the request come first.
 * @file        server.js
 * @author      Sindooja Gajam
 * @version     node v12.10.0 
 * @since       16 December 2019            
 */

/**
 * @const       express    Express constant having the `express` module
 * @const       bodyParser Bodyparser constant having the `body-parser` module
 * @const       mongoose   Mongoose constant having the `mongoose` module
 * @const       app        App constant having the `express()`
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database.config');
const app = express();
var cors = require('cors')
const validator = require('express-validator');
var route = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utility/swagger');
const redis = require('./services/redis');

app.use('/fundoo', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
require('dotenv').config();
app.use(bodyParser.json());
app.use(validator());
app.use('/', route);
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Fundoo application."});
});

var port = process.env.PORT || 3001;

app.listen(port, () => {
    mongoose.connect();
    redis.connect();
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;