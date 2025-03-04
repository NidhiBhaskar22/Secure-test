import nodemailer from 'nodemailer';
import { config } from '../config.js';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
});

export const sendPasswordResetOtp = async (email, otp) => {
  const mailOptions = {
    from: config.smtp.user,
    to: email,
    subject: 'Password Reset OTP',
    html: `
      <h1>Password Reset OTP</h1>
      <p>Your OTP for password reset is:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};