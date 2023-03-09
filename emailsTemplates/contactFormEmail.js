const { transporter } = require('../config-emails');

async function contactFormEmail(email, message) {
    let subject = "";
    let template = "";
    try {
        subject = 'Aveți un mesaj din partea unui utilizator al portalului Organizez.ro';
        template = '<p>A fost înregistrat un mesaj din partea unui utilizator al portalului Organizez.ro</p>';
        template += '<p>Email utilizator: ' + email + '</p>';
        template += '<p>Mesaj de la utilizator: ' + message + '</p>';

        await transporter.sendMail({
            from: '"Organizez.ro <contact@organizez.ro>', 
            to: 'boangiu.alexandra@yahoo.com',
            subject: subject,
            html: template,
        }, async (error, info) => {
            if (error) {
               console.log(error)
            } else {
                console.log(info)
            }
        });
        
    } catch (error) {
        return error;
    }
}
module.exports = { contactFormEmail };