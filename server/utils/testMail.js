import nodemailer from "nodemailer";
import { config } from "../config.js"; // Ensure SMTP credentials are in config

export const sendInviteEmail = async (email, inviteLink) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    });

    const mailOptions = {
      from: `"SecureTest Platform" <${config.smtp.user}>`,
      to: email,
      subject: "You're Invited to Attempt a Test!",
      html: `
        <p>Hello,</p>
        <p>You have been invited to take a test on SecureTest Platform.</p>
        <p>Click the link below to sign up and attempt the test:</p>
        <a href="${inviteLink}" style="color:blue;">Attempt Test</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Invite sent successfully to ${email}`);
  } catch (error) {
    console.error(`❌ Error sending invite email: ${error.message}`);
    throw new Error("Failed to send invite email");
  }
};
