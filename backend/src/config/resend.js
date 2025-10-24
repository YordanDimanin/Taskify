import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const emailHtml = `
  <div
    style="
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #dddddd;
      border-radius: 8px;
      background-color: #2c3e50;
      color: #ffffff !important;
      -webkit-text-size-adjust:none;
      -ms-text-size-adjust:none;
    "
  >
    <h1
      style="
        color: #ffffff !important;
        text-align: center;
        border-bottom: 2px solid #3498db;
        padding-bottom: 10px;
        margin-top: 0;
      "
    >
      Welcome to Taskify! 🎉
    </h1>

    <p style="font-size: 16px; color: #ffffff !important; margin-top: 20px;">
      Hello there,
    </p>

    <p style="font-size: 16px; color: #ffffff !important;">
      We're thrilled to welcome you to the <strong>Taskify</strong> family. Thank you for joining us!
    </p>

    <p style="font-size: 16px; color: #ffffff !important;">
      Your journey to organized and stress-free productivity starts now. With Taskify, you can easily:
    </p>

    <ul style="font-size: 16px; margin-left: 20px; color: #ffffff !important;">
      <li>✅ <strong>Get started instantly</strong> with a super-clean interface and zero learning curve.</li>
      <li>➡️ <strong>Visually organize your workflow</strong> by dragging and dropping tasks between <strong>To Do, In Progress, and Done</strong> columns. It's fast, fun, and intuitive!</li>
      <li>💡 <strong>Achieve clarity in seconds</strong> by seeing exactly what needs to happen next, without the noise.</li>
    </ul>

    <p style="font-size: 16px; color: #ffffff !important; margin-top: 30px;">
      We're excited to see what you achieve!
    </p>

    <p style="font-size: 16px; color: #ffffff !important; margin-top: 30px;">
      Best regards,<br>
      The <strong>Taskify</strong> Team
    </p>
  </div>
`;



export const sendWelcomeEmail = async (email) => {
  try {
    await resend.emails.send({
                  // Add custom domain to send emails
      from: 'Taskify <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Taskify!',
      html: emailHtml,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

