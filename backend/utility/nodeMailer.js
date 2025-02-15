/**
 * @description This file contains function to send mail to the registered user's email id.
 * @file        utility.nodeMailer.js
 * @since       18 December 2019
 * @author      Sindooja Gajam
 */

/**
 * @const       nodemailer Nodemailer constant having the `nodemailer` module
 */
const path = require("path");
const nodemailer = require("nodemailer");
var logger = require("../config/winston");
const hbs = require("nodemailer-handlebars");

module.exports = {
  /**
   * @description This function sends the mail to the user's email id.
   * @function    sendMail
   * @param {*}   email
   * @param {*}   url
   */
  sendMail(email, url, templateName) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });


    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          partialsDir: "templates/",
          defaultLayout: "",
        },
        viewPath: "templates/",
        extName: ".handlebars",
      })
    );

    const mailOptions = {
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "link sent from nodemailer", // Subject line
      template: templateName.template,
      context: {
        name: url,
      },
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return err;
      } else {
        return info;
      }
    });
  },
};
