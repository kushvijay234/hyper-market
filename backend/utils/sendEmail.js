import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// ✅ Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use Gmail App Password
  },
});

/**
 * Send email notification
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} text - plain text message
 */
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
