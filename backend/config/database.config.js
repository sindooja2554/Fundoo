const mongoose = require('mongoose');
require('dotenv').config();
var logger =require('./winston') // logs to STDOUT

class Database{

    constructor(){
        this.mongoose = mongoose;
        this.host     = process.env.host;
        this.port     = process.env.port;
        this.url      = process.env.url;
    }

    connect(){
        this.mongoose.connect(this.url, {
            //useMongoClient: true,
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