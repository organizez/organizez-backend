const { transporter } = require('../config-emails');

async function contactFormEmail() {
    let subject = "";
    let template = "";
    try {
        subject = 'Contact Form';
        template = '';
        template += '<p>HTML version of the message</p>';

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