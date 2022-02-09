const nodemailer = require('nodemailer');

const sendCredentialEmail = function(name, email) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'margot.barrows29@ethereal.email',
            pass: '8ST3eZKmxdcVrDxyf7'
        }
    });
    const options = {
        from: '"Our application" <ourapp@mail.com>',
        to: email,
        subject: "Credentials",
        text: "Created username: " + name + " for email: " + email
    }
    transporter.sendMail(options, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}

module.exports = {
    sendCredentialEmail
  };