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
module.exports = {
    /**
     * @description This function generates the short code using the module shortId.
     * @function    shortURL 
     * @param {*}   data 
     * @param {*}   longURL 
     * @param {*}   callback 
     */
    shortURL(data,longURL,callback)
    {
        try
        {
            var urlCode  = urlShortner.generate(longURL);
            let shortUrl = 'http://localhost:3001/verify/' + urlCode;
            
            let urlShortenerObject = {
                'longUrl' : longURL,
                'shortUrl': shortUrl,
                'urlCode' : urlCode
            }
            mailSender.sendMail(data.email,shortUrl);
            service.urlShorteningServices(data,urlShortenerObject,callback)
    
        }
        catch(error)
        {
            console.log(error);
            return callback(error);
        }
    }
}