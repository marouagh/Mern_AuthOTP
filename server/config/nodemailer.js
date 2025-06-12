import nodemailer from 'nodemailer';
import { RESET_PASSWORD_TEMPLATE } from './emailTemplates.js';

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter  = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

const sendMail = async (to, subject, text, otp) => {
    const mailOptions = {
      from: 'marouaghh@gmail.com',
      to,
      subject,
      text,
      html: RESET_PASSWORD_TEMPLATE(otp),
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("📧 Email envoyé avec succès à", to);
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi de l'e-mail :", error.message);
    }
  };
  
  export default sendMail;
