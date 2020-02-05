/**
 * @description This file contains function to send mail to the registered user's email id.
 * @file        utility.nodeMailer.js
 * @since       18 December 2019
 * @author      Sindooja Gajam
 */

/**
 * @const       nodemailer Nodemailer constant having the `nodemailer` module
 */
const nodemailer = require('nodemailer');
var logger =  require('../config/winston')
module.exports={
    /**
     * @description This function sends the mail to the user's email id.
     * @function    sendMail
     * @param {*}   email 
     * @param {*}   url 
     */
    sendMail(email,url)
    {
        logger.info("email "+email);
        logger.info("url " +url);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: process.env.EMAIL,
                   pass: process.env.PASSWORD
               }
        });
        
        const mailOptions = {
            from: process.env.EMAIL,  // sender address
            to: email,  // list of receivers
            subject: 'link sent from nodemailer',  // Subject line
            text: 'click on the link '+url   
        };
        
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
            {
                console.log(err);
                return err
            }
            else{
                console.log(info);
                return info
            }
         });
    }

}
