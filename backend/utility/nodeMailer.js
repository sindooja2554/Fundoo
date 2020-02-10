/**
 * @description This file contains function to send mail to the registered user's email id.
 * @file        utility.nodeMailer.js
 * @since       18 December 2019
 * @author      Sindooja Gajam
 */

/**
 * @const       nodemailer Nodemailer constant having the `nodemailer` module
 */
const path = require('path');
const nodemailer = require('nodemailer');
var logger =  require('../config/winston');
const hbs = require('nodemailer-handlebars');
// var PASSWORD_RESET_URL = require('../../constants').PASSWORD_RESET_URL,
// var templates =require('../templates')
module.exports={
    /**
     * @description This function sends the mail to the user's email id.
     * @function    sendMail
     * @param {*}   email
     * @param {*}   url
     */
    sendMail(email,url,templateName)
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

        logger.info("use is called ");

        transporter.use('compile', hbs({            
            viewEngine: {
                partialsDir: "/home/admin1/Fundoo/backend/templates",
                defaultLayout: ""
            },
            viewPath: "/home/admin1/Fundoo/backend/templates",
            extName: ".handlebars"})
            );

        logger.info("options is called ");

        const mailOptions = {
            from: process.env.EMAIL,  // sender address
            to: email,  // list of receivers
            subject: 'link sent from nodemailer',  // Subject line
            template: templateName.template,
            context: {
                name: url
            }
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
            {
                logger.error(err);
                return err
            }
            else{
                logger.info(info);
                return info
            }
         });
    }

}