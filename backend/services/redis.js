var redis = require("redis");
require("dotenv").config();
const logger = require("../config/winston");

class RedisServerClass {
    constructor() {
        this.client = redis.createClient(
            {
                port: process.env.REDIS_PORT
            }
        );
    }
    connect() {
        this.client
        this.monitor();
    }

    set(redisKey,value,callback) {
        this.client.set(redisKey,value,(error,data)=>{
            if(error) {
                return callback(error);
            }else{
                return callback(data);
            }
        })
    }

    get(redisKey,callback) {
        this.client.get(redisKey,(error,response)=>{
            if(error){
                return callback(error)
            } else{
                return callback(response)
            }
        })
    }

    monitor() {
        this.client.on("connect", function () {
            logger.info("Redis client connected successfully");
        });

        this.client.on("reconnecting", function () {
            logger.info("Redis client is reconnecting..");
        });

        this.client.on("warning", function () {
            logger.info("Redis client is emmiting some deprecating warnings..");
        });

        this.client.on("error", function (err) {
            logger.error("Something went wrong " + err);
        });

        this.client.on("end", function () {
            logger.log("Redis client disconnected");
        });
        this.client.on('ready', function () {
            logger.info('Redis client is ready now..');

        });

    }
}
module.exports = new RedisServerClass();