const nodemailer = require('nodemailer');
const mailerConfig = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
    },
});

exports.sendEmail = (to, subject, text) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.MAILER_USER,
            to: to,
            subject: subject,
            html: text,
        };
        
        mailerConfig.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({ error: true, message: error.message });
            } else {
                resolve({ error: false, message: 'Email sent' });
            }
        });
    });
};
