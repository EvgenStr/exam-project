const nodemailer = require('nodemailer');
const CONSTANTS = require('../constants');

const transporter = nodemailer.createTransport({
  host: CONSTANTS.SMTP_HOST,
  port: CONSTANTS.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: CONSTANTS.SMTP_USER,
    pass: CONSTANTS.SMTP_PASS,
  },
});

module.exports.changeOfferStatusMail = async (mail, name, status) => {
  return await transporter.sendMail({
    from: CONSTANTS.SMTP_USER,
    to: mail,
    subject: `Hello ${name}, your offer status has been changed`,
    text: 'Hello world?',
    html: `<p>Hello <b>${name}</b>, your offer status has been changed to <b>${status}</b></p>`,
  });
};
