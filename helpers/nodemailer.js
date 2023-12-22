const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD, EMAIL_FROM} = process.env

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig)

const sendMail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  await transport.sendMail(email);
  return true
}

// const email = {
//   to: "riwir58194@beeplush.com",
//   from: EMAIL_FROM,
//   subject: "Test email",
//   html: "<p>Hello world</p>"
// }

// transport.sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch(err => console.log(err.message))

module.exports = sendMail