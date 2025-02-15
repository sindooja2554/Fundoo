/**
 * @description This file contains functions to short the long url.
 * @file        utility.urlShortner.js
 * @since       17 December 2019
 * @author      Sindooja Gajam
 */

/**
 * @const       urlShortner UrlShortner constant having the `shortid` module
 */

const urlShortner = require('shortid');
var mailSender = require('./nodeMailer');
var service = require('../services/user');
var logger =  require('../config/winston')
require('dotenv').config();
module.exports = {
    /**
     * @description This function generates the short code using the module shortId.
     * @function    shortURL 
     * @param {*}   data 
     * @param {*}   longURL 
     * @param {*}   callback 
     */
    shortURL(data,longURL)
    {
        try
        {
            var urlCode  = urlShortner.generate(longURL);
            let shortUrl = process.env.EMAIL_LONG_URL + urlCode;
            
            let urlShortenerObject = {
                'longUrl' : longURL,
                'shortUrl': shortUrl,
                'urlCode' : urlCode
            }
            mailSender.sendMail(data.email, shortUrl, {template : "verify"})
            return new Promise(function(resolve,reject){
                service.urlShorteningServices(data,urlShortenerObject).then(data=>{
                    resolve(data) 
                }).catch(error=>{
                    reject(error)
                })
            })
        }
        catch(error)
        {
            return callback(error);
        }
    }
}