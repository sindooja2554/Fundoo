const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database.config');
const app = express();
const validator = require('express-validator');
var route = require('./routes/routes')

app.use(bodyParser.json());
app.use(validator());
app.use('/', route);
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application."});
});

var connection = mongoose.connect();
console.log(connection);

app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});