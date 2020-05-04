const nodemailer = require('nodemailer');
var {email,pass} = require('../config/mail');

module.exports.mailverify = (to,otp)=>{
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
        to: to,
        subject: "Forgot paasword",
         text: `Click this link to set new password for your account,\n https://techmate2020.herokuapp.com/update?email=${to}&otp=${otp}` 
    };
    transporter.sendMail(mail,function(err,info){
        if(err){
            console.log(err);
        }
        else {
            console.log('email sent to :'+ to);
        }

    });
}