const aws = require('../Config/awsConfig');
const ses = new aws.SES({ apiVersion: '2010-12-01' });
require('dotenv').config();

/*exports.sendEmail = async (to, subject, text) => {
    try{
        const mailOptions = {
            from: process.env.MAILER_USER,
            to: to,
            subject: subject,
            text: text,
        };
        
        mailerConfig.sendMail(mailOptions, (error, info) => {
            if (error) {
                return {error: true, message: error.message};
            } else {
                return {error: false, message: 'Email sent'};
            }
        });
    }catch(error){
        return {error: true, message: error.message};
    }
}*/

exports.sendEmail = async (to, subject, text) => {
    const params = {
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: text,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
        Source: '3000185250101@ingenieria.usac.edu.gt',
      };
      
      const res = await ses.sendEmail(params).promise();
      if(res.error){
        return {error: true, message: res.error.message};
      }

      return {error: false, message: 'Email sent'};
};