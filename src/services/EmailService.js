// const sendgrid = require('@sendgrid/mail');

// const SENDGRID_API_KEY = "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"

// sendgrid.setApiKey(SENDGRID_API_KEY)

// const sendCredentialEmail = function(name, email) {

//     const msg = {
//     to: `${email}`,
//     from: 'margot.barrows29@ethereal.email',
//     subject: 'Distributor account',
//     text:`Hello! You have just created an account for ${email} with username ${name}`,
//     }
//     sendgrid
//     .send(msg)
//     .then((resp) => {
//         console.log('Email sent\n', resp)
//     })
//     .catch((error) => {
//         console.error(error)
//     })
// }
require('dotenv').config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const sendCredentialEmail = (name, email) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
        }
    });

    let mail = {
        to: `${email}`,
        from: process.env.EMAIL,
        subject: 'Distributor account',
        text:`Hello! You have just created an account for ${email} with username ${name}`,
        }

    transporter.sendMail(mail, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("info.messageId: " + info.messageId);
            console.log("info.envelope: " + info.envelope);
            console.log("info.accepted: " + info.accepted);
            console.log("info.rejected: " + info.rejected);
            console.log("info.pending: " + info.pending);
            console.log("info.response: " + info.response);
        }
        transporter.close();
    });
}

module.exports = {
    sendCredentialEmail
  };