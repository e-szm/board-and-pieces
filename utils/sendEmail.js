const nodemailer = require("nodemailer");

module.exports = async function (options) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "DONOTREPLY@knightsedge.com",
    to: options.email,
    subject: options.subject,
    text: options.body,
  };

  await transporter.sendMail(mailOptions);
};
