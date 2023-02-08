const nodemailer = require('nodemailer');
const config = require('../configs/config');


const sendEmail = async (data) => {
    //Create transport object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: config.MAIL_USERNAME,
          pass: config.MAIL_PASSWORD,
          clientId: config.GOOGLE_0AUTH_CLIENT_ID,
          clientSecret: config.GOOGLE_0AUTH_CLIENT_SECRET,
          refreshToken: config.GOOGLE_0AUTH_REFRESH_TOKEN
        }        
      });
      
      //Set mail options
      const mailOptions = {
        from: 'dnexteinstein2@gmail.com',
        to: data.email,
        subject: data.subject,
        html: `
        <h3>Hello ${data.name}</h3>
        <p>We received a request to change the password for your CoolMart account.</p>
        <p>Click <a href="http://localhost:3050/change-password/${data.userId}/${data.token}">here</a> to reset your password.</p>
        <p>If you did not initiate the request, please contact us immediately at <a href="#">support@coolmart.com</a></p>
        <p>Thank you.</p>
        <p><strong>The CoolMart Team</strong></p>
        `
      };


      try {
        const data = await transporter.sendMail(mailOptions);
        if (data) {
          return true;
        }
      } catch(err) {
        console.log(err);
        return false
      }
}


module.exports = {
  sendEmail,
}
