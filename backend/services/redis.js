var redis = require("redis");
require("dotenv").config();
const logger = require("../config/winston");
// const client = redis.createClient(process.env.REDIS_PORT);

class RedisServerClass {
    constructor() {
        this.client = redis.createClient(
            {
                port: process.env.REDIS_PORT
                // host: process.env.REDIS_HOST
            }
        );
    }
    connect() {
        this.client
        this.monitor();
    }

    monitor() {
        this.client.on("connect", function () {
            // console.log('Redis client connected');
            logger.info("Redis client connected successfully");
        });

        this.client.on("reconnecting", function () {
            // console.log('Redis client connected');
            logger.info("Redis client is reconnecting..");
        });

        this.client.on("warning", function () {
            // console.log('Redis client connected');
            logger.info("Redis client is emmiting some deprecating warnings..");
        });

        this.client.on("error", function (err) {
            // console.log('Something went wrong ' + err);
            logger.error("Something went wrong " + err);
        });

        this.client.on("end", function () {
            // console.log('Redis client connected');
            logger.log("Redis client disconnected");
        });
        this.client.on('ready', function () {
            // console.log('Redis client connected');
            logger.info('Redis client is ready now..');

        });

        // this.client.on('idle', function() {
        // // console.log('Redis client connected');
        // logger.info('Redis client is idle now..');

        // });
    }
}
module.exports = new RedisServerClass();