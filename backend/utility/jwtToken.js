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

module.exports={
    /**
     * @description This function generates token using payload.
     * @function    generateToken
     * @param {*}   payload 
     */
    generateToken(payload)
    {
        console.log("payload",payload);
        var token = jwt.sign(payload,'private_key')
        console.log("token",token);
        return token;
    },

    /**
     * @description This function verfies the user by the token gets the decoded data 
     *              by given token
     * @param {*}   req 
     * @param {*}   res 
     * @param {*}   next 
     */
    verifyToken(req,res,next)
    {    
        // logger.info("request "+req);
        // console.log("request", req);
        let token = req.headers.token || req.params;
        logger.info(" token after vread " + req.headers.token);
        // console.log(" token after vread " , req.param);
        // console.log(" token after vread " , req.query);
        // logger.info("token "+req.headers.token);
        if(token)
        {
            jwt.verify(token,'private_key',function (err,decoded){
                // console.log("token in ",token);
                
                if(err)
                {
                    return res.status(400).send(err+"Token has expired")
                }
                else{
                    console.log("req.url",req.url);
                    // console.log("req.params",req.params);
                    var redisData;
                    if (req.url.split('/').includes('resetpassword') === true) {
                        redisData = "forgetToken";
                    } else if (req.url.split('/').includes('verifyuser') === true) {
                        redisData = "registrationToken";
                    } else if(req.url.split('/').includes('imageupload')===true){
                        redisData = "loginToken";
                    } else if(req.url.split('/').includes('note') ||
                     req.url.split('/').includes('getnote') ===true){
                        redisData = "loginToken"
                    }
                    console.log("data",redisData);
                    console.log("token",JSON.stringify(decoded));
                    // console.log("\nJWT verification result: " + JSON.stringify(data));
                    req.body['data'] = decoded;
                    console.log("abc",req.body);
                    req.token = decoded;
                    // redisKey = 'registerId';
                    logger.info("before sending data "
                    +req.body.data._id);
                    logger.info("redisdata "+redisData+req.body.data._id);
               client.get(redisData+req.body.data._id,(error,reply)=>{
                   if(error)
                   {
                       return res.status(500).send(err+"Some Error");
                   }else if(reply == token)
                    {
                       console.log("data from redis==>",reply);
                       next();
                    }
                    else{
                        return res.status(400).send("Token did not matched");
                    }
                   })
                }
            })
            // return req.decoded;
        }
        else{
            res.status(400).send('Token not received')
        }
    }
}