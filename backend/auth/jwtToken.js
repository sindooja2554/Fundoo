/**
 * @description This file have functions to generate and verify token.
 * @file        utility.jwtToken.js
 * @since       16 December 2019
 * @author      Sindooja Gajam
 */

/**
 * @constant    jwt JWT constant having the `jsonwebtoken` module
 */
const jwt = require('jsonwebtoken');
var redis = require("redis"),
    client = redis.createClient();
var logger = require('../config/winston');

module.exports = {
    /**
     * @description This function generates token using payload.
     * @function    generateToken
     * @param {*}   payload 
     */
    generateToken(payload) {
        console.log("payload", payload);
        var token = jwt.sign(payload, 'private_key')
        console.log("token", token);
        return token;
    },

    /**
     * @description This function verfies the user by the token gets the decoded data 
     *              by given token
     * @param {*}   req 
     * @param {*}   res 
     * @param {*}   next 
     */
    verifyToken(req, res, next) {
        try {
            // console.log("token1",req.headers)
            let token = req.headers.token;  
            //  || req.params;
            // logger.info(" token after vread " +Object.keys(token).length);
            // console.log("token "+token);
            if (token === undefined || token === "" || Object.keys(token).length === 0 || token === null) throw 'Token not received'
            // logger.info("length "+token);
            if (token !== null && token !== undefined && token !== "") {
                // logger.info("token inside if "+token)
                // console.log("token inside if ",token)

                jwt.verify(token, 'private_key', function (err, decoded) {
                    if (err) {
                        // console.log("error",err);
                        return res.status(400).send(err)
                    }
                    else {
                        logger.info("url ======", req.url);
                        var route = req.url.split('/');
                        logger.info("req.url", route[1]);
                        var redisData;
                        switch (route[1]) {
                            case "resetpassword":
                                {
                                    redisData = "forgetToken";
                                    break;
                                }
                            case "imageupload":
                                {
                                    redisData = "loginToken";
                                    break;
                                }
                            case "label":
                                {
                                    redisData = "loginToken";
                                    break;
                                }
                            case "verifyuser":
                                {
                                    redisData = "registrationToken";
                                    break;
                                }
                            case "note":
                                {
                                    redisData = "loginToken";
                                    break;
                                }
                            case "remainder":
                                {
                                    redisData = "loginToken";
                                    break;
                                }
                            case "search":
                                {
                                    redisData = "loginToken";
                                    break;
                                }
                        }
                        req.body['data'] = decoded;
                        req.token = decoded;
                        // logger.info("before sending data " + req.body.data._id);
                        logger.info("redisdata " + redisData + req.body.data._id);
                        client.get(redisData + req.body.data._id, (error, reply) => {
                            if (error) {
                                return res.status(500).send(err + "Some Error");
                            } else if (reply === token) {
                                logger.info("data from redis==> "+ reply);
                                next();
                            }
                            else {
                                logger.error("data from redis "+reply)
                                return res.status(400).send("Invalid Authentication"); 
                            }
                        })
                    }
                })
            }
            else {
                logger.info("error");
                res.status(400).send('Token not received')
            }
        }
        catch(error) {
            logger.info("error " + error)
            return res.status(400).send(error)
        }

    }
}