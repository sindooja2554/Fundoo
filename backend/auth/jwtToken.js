/**
 * @description This file have functions to generate and verify token.
 * @file        utility.jwtToken.js
 * @since       16 December 2019
 * @author      Sindooja Gajam
 */

/**
 * @constant    jwt JWT constant having the `jsonwebtoken` module
 */
const jwt = require("jsonwebtoken");
var redis = require("redis"),
  client = redis.createClient();
var logger = require("../config/winston");
var redisCache = require("../services/redis");
module.exports = {
  /**
   * @description This function generates token using payload.
   * @function    generateToken
   * @param {*}   payload
   */
  generateToken(payload) {
    var token = jwt.sign(payload, "private_key");
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
      let token = req.headers.token || req.params.token;
      if (
        token === undefined ||
        token === "" ||
        Object.keys(token).length === 0 ||
        token === null
      )
        throw "Token not received";

      if (token !== null && token !== undefined && token !== "") {
        jwt.verify(token, "private_key", function (err, decoded) {
          if (err) {
            return res.status(400).send(err);
          } else {
            var route = req.url.split("/");
            var redisData;
            switch (route[1]) {
              case "resetpassword": {
                redisData = "forgetToken";
                break;
              }
              case "imageupload": {
                redisData = "loginToken";
                break;
              }
              case "label": {
                redisData = "loginToken";
                break;
              }
              case "verifyuser": {
                redisData = "registrationToken";
                break;
              }
              case "note": {
                redisData = "loginToken";
                break;
              }
              case "remainder": {
                redisData = "loginToken";
                break;
              }
              case "search": {
                redisData = "loginToken";
                break;
              }
              case "addlabel": {
                redisData = "loginToken";
                break;
              }
              case "removelabel": {
                redisData = "loginToken";
                break;
              }
              case "notesequencing": {
                redisData = "loginToken";
                break;
              }
              case "addcollaborator": {
                redisData = "loginToken";
                break;
              }
              case "removecollaborator": {
                redisData = "loginToken";
                break;
              }
            }
            req.body["data"] = decoded;
            req.token = decoded;
            redisCache.get(redisData + req.body.data._id, (reply) => {
              if (reply === token) {
                next();
              } else {
                return res.status(400).send("Invalid Authentication");
              }
            });
          }
        });
      } else {
        res.status(400).send("Token not received");
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
