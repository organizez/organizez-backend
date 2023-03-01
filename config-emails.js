const nodemailer = require("nodemailer");

const configEmails = {
    host: "mail.organizez.ro",
    port: 993,
    secure: false,
    pool: true,
    maxConnections: 1,
    tls: {
        rejectUnauthorized: false
    }
}

const transporter = nodemailer.createTransport(configEmails);
module.exports = { configEmails, transporter };