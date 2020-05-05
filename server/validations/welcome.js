const nodemailer = require('nodemailer');
var {email,pass} = require('../config/mail');

module.exports.mailverify = ()=>{
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
        subject: "Welcome to Techmate",
        text: `TechMate is a budding community of girls pursuing Computer Science. We aim to bring together girls from colleges all over the world, to share experiences, collaborate on projects, mentor others and find support that is scarce for us. We Also provide a common forum where you can discuss your queries. Support us, Be part of our initiative by representing your college. Post your project ideas to find team mates. \n\nTeam Techmate \nHappy Coding!!` 
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