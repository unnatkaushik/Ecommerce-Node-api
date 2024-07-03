import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import ejs from "ejs";
import path from "path";
const sendMail = async (email, subject, template, data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || "587",
    service: process.env.SMTP_SERVICE, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(
    __dirname, //we can pass __dirname here to merge file
    "../templates",
    template
  );
  const html = await ejs.renderFile(templatePath, data);
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export { sendMail };
