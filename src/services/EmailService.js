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
