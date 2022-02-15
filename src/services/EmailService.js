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

const sendCredentialEmail = async (name, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: 'Distributor account',
        text:`Hello! You have just created an account for ${email} with username ${name}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = {
    sendCredentialEmail
  };