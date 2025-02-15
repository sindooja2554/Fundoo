const Redis = require("ioredis");
require("dotenv").config();
const logger = require("../config/winston");

class RedisServerClass {
    constructor() {
        // Create a new Redis client using the provided URI
        this.client = new Redis({
            port: process.env.REDIS_PORT || 18656, // Default to 18656 if no REDIS_PORT is set
            host: process.env.REDIS_HOST || "valkey-2d188940-fundoo.h.aivencloud.com", // Default to provided host
            username: process.env.REDIS_USER || "default", // Default to 'default' user
            password: process.env.REDIS_PASSWORD, // Password from environment variable
            tls: { rejectUnauthorized: false } // Enable TLS (SSL) connection
        });
    }

    connect() {
        this.client.on("connect", () => {
            logger.info("Redis client connected successfully");
        });
        this.monitor();
    }

    set(redisKey, value, callback) {
        this.client.set(redisKey, value, (error, data) => {
            if (error) {
                return callback(error);
            } else {
                return callback(data);
            }
        });
    }

    get(redisKey, callback) {
        this.client.get(redisKey, (error, response) => {
            if (error) {
                return callback(error);
            } else {
                return callback(response);
            }
        });
    }

    monitor() {
        this.client.on("connect", () => {
            logger.info("Redis client connected successfully");
        });

        this.client.on("reconnecting", () => {
            logger.info("Redis client is reconnecting..");
        });

        this.client.on("warning", () => {
            logger.info("Redis client is emitting some deprecating warnings..");
        });

        this.client.on("error", (err) => {
            logger.error("Something went wrong " + err);
        });

        this.client.on("end", () => {
            logger.info("Redis client disconnected");
        });

        this.client.on("ready", () => {
            logger.info("Redis client is ready now..");
        });
    }
}

module.exports = new RedisServerClass();