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
const Email = require("email-templates");
var sender = "smtps://fundoo8468%40gmail.com"; // The email to use in sending the email
//(Change the @ symbol to %40 or do a url encoding )
var password = process.env.PASSWORD;
module.exports = {
  sendMail(email, userName, name, token) {
    var transporter = nodemailer.createTransport(
      sender + ":" + password + "@smtp.gmail.com"
    );

    const emailSender = new Email({
      template: "../templates/resetPassword",

      message: {
        from: sender,
        subject: "Password Reset - Fundoo.com",
        to: email,
      },

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
      })
      .then(console.log)
      .catch(console.error);
  },
};
