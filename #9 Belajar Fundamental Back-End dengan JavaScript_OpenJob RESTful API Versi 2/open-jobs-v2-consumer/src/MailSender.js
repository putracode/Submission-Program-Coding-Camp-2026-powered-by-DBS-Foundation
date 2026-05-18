import nodemailer from "nodemailer";
class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: "noreply@openjobs.com",
      to: targetEmail,
      subject: "Application Notification",
      text: "Terlampir detail informasi pelamar",
      attachments: [
        {
          filename: "applicant.json",
          content,
        },
      ],
    };
    return this._transporter.sendMail(message);
  }
}

export default MailSender;
