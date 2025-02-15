/**
 * @description To establish mongodb connection
 * @file        database.config.js
 * @overview    Establishing connection with mongoose  
 * @author      Sindooja Gajam
 * @version     mongoose "^5.8.1" 
 * @since       12 December 2019     
 */
/**
 * @const       mongoose Mongoose constant having the `mongoose` module
 */
const mongoose = require('mongoose');
require('dotenv').config();
var logger = require('./winston')

class Database{

    constructor(){
        this.mongoose = mongoose;
        this.url      = process.env.URL;
    }

    connect(){
        this.mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds
            socketTimeoutMS: 45000,         // Close sockets after 45 seconds
        });
        this.monitor();
        return this.mongoose;

    }

    monitor(){
        mongoose.connection.on('disconnected', function() {
            console.log("connection closed");
            logger.info('mongo db connection closed');
            process.exit(0);
        });
        
        mongoose.connection.on('connecting', function(){
            console.log("connecting");
            logger.info("trying to establish a connection to mongo");
        });
        
        mongoose.connection.on('connected', function() {
            console.log("connected");
            logger.info("connection established successfully");
        });
        
        mongoose.connection.on('error', function(err) {
            console.log("connection error");
            logger.error('connection to mongo failed ' + err);
            process.exit(0);
        });
    }
}

module.exports=new Database();