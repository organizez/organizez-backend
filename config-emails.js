const nodemailer = require("nodemailer");

const configEmails = {
    host: 'smtp.gmail.com',
    port: 465,
    
    auth: {
      user: 'baditoiudenisa@gmail.com',
      pass: 'dumirliniactdabd'
    },
    tls: {
        rejectUnauthorized: false
    }
}

const transporter = nodemailer.createTransport(configEmails);

transporter.verify(function(error, success) {
    if (error) {
          console.log("error", error);
    } else {
          console.log('Server is ready to take our messages');
    }
  });
module.exports = { configEmails, transporter };