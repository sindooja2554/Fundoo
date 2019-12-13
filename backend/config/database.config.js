const mongoose = require('mongoose');
require('dotenv').config();
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
            connectTimeoutMS: 10000
        });
        this.monitor();
        return this.mongoose;

    }

    monitor(){
        mongoose.connection.on('disconnected', function() {
            console.log('mongo db connection closed');
            process.exit(0);
        });
        
        mongoose.connection.on('connecting', function(){
            console.log("trying to establish a connection to mongo");
        });
        
        mongoose.connection.on('connected', function() {
            console.log("connection established successfully");
        });
        
        mongoose.connection.on('error', function(err) {
            console.log('connection to mongo failed ' + err);
            process.exit(0);
        });
    }
}

module.exports=new Database();