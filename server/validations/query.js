const nodemailer = require('nodemailer');
var {email,pass} = require('../config/mail');

module.exports.mailQuery = (name,mail,query)=>{
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true ,
        auth: {
            type: "login",
            user: email,
            pass: pass
        }
    });
    var mail = {
        from: email,
        to: "noreplymailfortest@gmail.com",
        subject: "Query",
         text: `name: ${name}\nEmail: ${mail}\n query: ${query}` 
    };
    transporter.sendMail(mail,function(err,info){
        if(err){
            console.log(err);
        }
        else {
            console.log('email sent');
        }

    });
}