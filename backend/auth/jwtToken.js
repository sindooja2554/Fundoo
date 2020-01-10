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
            let token = req.headers.token || req.params;
            logger.info(" token after vread " + req.headers.token);
            if (token === null || token === undefined || token === "") throw ('Token not received')
            // logger.info("length "+token.length);
            if (token !== null || token !== undefined || token !== "") {
                logger.info("token inside if "+JSON.stringify(token))
                jwt.verify(token, 'private_key', function (err, decoded) {
                    if (err) {
                        return res.status(400).send(err + "Token has expired")
                    }
                    else {
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
                        }
                        req.body['data'] = decoded;
                        req.token = decoded;
                        logger.info("before sending data "
                            + req.body.data._id);
                        logger.info("redisdata " + redisData + req.body.data._id);
                        client.get(redisData + req.body.data._id, (error, reply) => {
                            if (error) {
                                return res.status(500).send(err + "Some Error");
                            } else if (reply == token) {
                                logger.info("data from redis==>", reply);
                                next();
                            }
                            else {
                                return res.status(400).send("Token did not matched");
                            }
                        })
                    }
                })
            }
            else {
                res.status(400).send('Token not received')
            }
        }
        catch (error) {
            logger.info("error " + error)
            return res.status(400).send(error)
        }

    }
}