const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.PASS_USER,
    },
  });

  const mailOptions = {
    form: '"Bibek Bhusal" <abc1@gmail.com>',
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
