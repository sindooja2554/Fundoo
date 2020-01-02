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
        console.log(req.params.token);       
        let token = req.headers['token'] || req.params.token;
        console.log(" token after vread",token);
        
        if(token)
        {
            jwt.verify(token,'private_key',function (err,decoded){
                console.log(" token in ",token);
                
                // console.log("tkg",data);
                if(err)
                {
                    return res.status(400).send(err+"Token has expired")
                }
                else{
                    console.log("req.url",req.url);
                    console.log("req.params",req.params);
                    const forgetToken = req.url.split('/').includes('resetpassword')
                    const registrationToken = req.url.split('/').includes('verifyuser')
                    console.log("register",registrationToken);
                    var redisData;
                    if (forgetToken === true) {
                        redisData = "forgetToken";
                    } else if (registrationToken === true) {
                        redisData = "registrationToken";
                    }
                    console.log("data",redisData);
                    console.log("token",JSON.stringify(decoded));
                    // console.log("\nJWT verification result: " + JSON.stringify(data));
                    req.body['data'] = decoded;
                    console.log("abc",req.body);
                    req.token = decoded;
                    // redisKey = 'registerId';
               client.get(redisData+req.body.data._id,(error,reply)=>{
                   if(error)
                   {
                       return res.status(500).send(err+"Some Error");
                   }else if(reply === token)
                    {
                       console.log("data from redis==>",reply);
                       next();
                    }
                    else{
                        return res.status(400).send(err+"Token did not matched");
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