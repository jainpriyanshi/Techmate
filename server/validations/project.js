const nodemailer = require('nodemailer');
var {email,pass} = require('../config/mail');
const Member = require ("../models/Member");
module.exports.mailverify = (by,title,topic)=>{
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
    var mailList =[];
    Member.find({},{email:1, _id:0}).then(docs => {
        docs.forEach(function(users){
            console.log(users);
            mailList.push(users.email);
            return mailList;
        });
    });
    
    console.log(mailList);
    var mail = {
        from: email,
        to: [],
        bcc: mailList,
        subject: "New Project",
        text: `I am glad to inform you that a new Project has been added by ${by} under the category ${topic} with title ${title}.\n
Checkout more projects on https://techmaters.herokuapp.com/project \n\nTeam Techmate \nHappy Coding!!` 
    };
    transporter.sendMail(mail,function(err,info){
        if(err){
            console.log(err);
        }
        else {
            console.log('email sent to :'+ mailList);
        }

    });
}