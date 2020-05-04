const nodemailer = require('nodemailer');
var {email,pass} = require('../config/mail');

module.exports.mailQuery = (name,mail,college)=>{
    var transporter = nodemailer.createTransport({
        host: 'us2.smtp.mailhostbox.com',
        port: 25,
        secure: false,
        auth: {
            user: email,
            pass: pass
        },
        tls: { secureProtocol: "TLSv1_method" }
    });
    var mail = {
        from: email,
        to: "techmate262405@gmail.com",
        subject: "Representative",
         text: `name: ${name}\nEmail: ${mail}\ncollege: ${college} \nTeam: Techmate \nHappy Coding!!` 
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