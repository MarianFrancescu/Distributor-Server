// const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');

// const sendCredentialEmail = function(name, email) {
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: 'margot.barrows29@ethereal.email',
    //         pass: '8ST3eZKmxdcVrDxyf7'
    //     }
    // });
    // const options = {
    //     from: '"Our application" <ourapp@mail.com>',
    //     to: email,
    //     subject: "Credentials",
    //     text: "Created username: " + name + " for email: " + email
    // }
    // transporter.sendMail(options, function (err, info) {
    //     if(err)
    //       console.log(err)
    //     else
    //       console.log(info);
    //  });
// }


const sendgrid = require('@sendgrid/mail');

const SENDGRID_API_KEY = "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"

sendgrid.setApiKey(SENDGRID_API_KEY)

const sendCredentialEmail = function(name, email) {

    const msg = {
    to: `${email}`,
    from: 'margot.barrows29@ethereal.email',
    subject: 'Distributor account',
    text:`Hello! You have just created an account for ${email} with username ${name}`,
    }
    sendgrid
    .send(msg)
    .then((resp) => {
        console.log('Email sent\n', resp)
    })
    .catch((error) => {
        console.error(error)
    })
}


module.exports = {
    sendCredentialEmail
  };