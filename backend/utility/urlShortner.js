const urlShortner = require('shortid');
var mailSender = require('./nodeMailer');
// var model      = require('../app/model/model');
var service = require('../services/userServices');
module.exports = {
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