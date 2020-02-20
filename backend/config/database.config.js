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
        this.host     = process.env.HOST;
        this.port     = process.env.DB_PORT;
        this.url      = process.env.URL || 'mongodb://127.0.0.1:27017/fundoo';
    }

    connect(){
        // console.log(this.url)
        this.mongoose.connect(this.url, {
            // useMongoClient: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 1000
        });
        this.monitor();
        return this.mongoose;

    }

    monitor(){

        this.mongoose.connection.on('disconnected', function() {
            logger.info('mongo db connection closed');
            process.exit(0);
        });
        
        mongoose.connection.on('connecting', function(){
            logger.info("trying to establish a connection to mongo");
        });
        
        mongoose.connection.on('connected', function() {
            logger.info("connection established successfully");
        });
        
        mongoose.connection.on('error', function(err) {
            logger.error('connection to mongo failed ' + err);
            process.exit(0);
        });
    }
}

module.exports=new Database();