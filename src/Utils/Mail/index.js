import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function sendMail(toEmail, content, expireTimeInMinutes = 5*60*1000) {
  try {
    const transport = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const Expire = expireTimeInMinutes/(60 * 1000)
    const mailOptions = {
      from: `"Saraha App" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2 style="color: #333;">Email Verification</h2>
          <p style="font-size: 16px;">Your verification code is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #007bff;">${content}</p>
          <p style="font-size: 14px; color: #555;">This code will expire in ${Expire} minute(s).</p>
        </div>
      `,
    };

    await transport.sendMail(mailOptions);
    return true;
  } 
  catch (err) 
  {
    return false;
  }
}


