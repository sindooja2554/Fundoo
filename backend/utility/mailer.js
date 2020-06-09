/**
 * @description This file contains function to send mail to the registered user's email id.
 * @file        utility.nodeMailer.js
 * @since       18 December 2019
 * @author      Sindooja Gajam
 */

/**
 * @const       nodemailer Nodemailer constant having the `nodemailer` module
 */
const nodemailer = require("nodemailer");
var logger = require("../config/winston");
// var EmailTemplate = require('email-templates').EmailTemplate;
const Email = require("email-templates");
var sender = "smtps://sindoojagajam%40gmail.com"; // The emailto use in sending the email
//(Change the @ symbol to %40 or do a url encoding )
var password = process.env.PASSWORD;
module.exports = {
  sendMail(email, userName, name, token) {
    var transporter = nodemailer.createTransport(
      // service: 'gmail',
      // auth: {
      //        user: process.env.EMAIL,
      //        pass: process.env.PASSWORD
      //    }
      sender + ":" + password + "@smtp.gmail.com"
    );

    // create template based sender function
    // assumes text.{ext} and html.{ext} in template/directory
    // var sendResetPasswordLink = transporter.templateSender(
    //     new EmailTemplate('./templates/resetPassword'), {
    //           from: process.env.EMAIL,
    //     });

    //     exports.sendPasswordReset = function (email, username, name, tokenUrl) {
    //         // transporter.template
    //         sendResetPasswordLink({
    //             to: email,
    //             subject: 'Password Reset - Fundoo.com'
    //         }, {
    //             name: name,
    //             username: username,
    //             token: tokenUrl
    //         }, function (err, info) {
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 console.log('Link sent\n'+ JSON.stringify(info));
    //             }
    //         });

    const emailSender = new Email({
      template: "../templates/resetPassword",

      message: {
        from: sender,
        subject: "Password Reset - Fundoo.com",
        to: email,
      },
      // locals: {
      //     username: username,
      //     url: url
      // },

      transport: {
        jsonTransport: true,
        to: email,
      },
    });
    emailSender
      .send({
        template: "../templates/resetPassword/html",
        message: {
          to: email,
        },
        // ,
        // locals: {
        //   name: 'Elon'
        // }
      })
      .then(console.log)
      .catch(console.error);
  },
};
