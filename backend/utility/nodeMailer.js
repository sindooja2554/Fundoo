const nodemailer = require('nodemailer');
require('dotenv').config();
module.exports={
    sendMail(email,url)
    {
        console.log(process.env.EMAIL);
        console.log(process.env.PASSWORD);
        
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
