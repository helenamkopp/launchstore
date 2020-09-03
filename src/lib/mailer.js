const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f21363049fc080",
    pass: "dc0505bed1bd16"
  }
});
