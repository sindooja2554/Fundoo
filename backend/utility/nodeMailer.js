const nodemailer = require('nodemailer');
require('dotenv').config();
module.exports={
    sendMail(email,url)
    {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: process.env.email,
                   pass: process.env.password
               }
        });
        
        const mailOptions = {
            from: process.env.email,  // sender address
            to: email,  // list of receivers
            subject: 'link sent from nodemailer',  // Subject line
            text: 'click on the link '+url   
        };
        
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    }

}
