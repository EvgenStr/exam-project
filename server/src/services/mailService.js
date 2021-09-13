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
    from: `no-reply ${CONSTANTS.SMTP_USER}`,
    to: mail,
    subject: 'Your offer status has been changed',
    html: `<h3>Hello <b>${name}</b></h3>
    <p>Your offer status has been changed to <b>${status}</b>!<p>
    <br/>
    <br/>
    <p>${CONSTANTS.APP_NAME} ${new Date().getFullYear()}</p>`,
  });
};

module.exports.resetPasswordMail = async (mail, token) => {
  return await transporter.sendMail({
    from: `no-reply ${CONSTANTS.SMTP_USER}`,
    to: mail,
    subject: 'Password change confirmation',
    html: `<p>Confirm password change:</p>
    <p><a href=${CONSTANTS.APP_URL}password-confirm/${token}>Reset your password</a>    </p>
    if you have not asked to change your password, please ignore this email
    <p>${CONSTANTS.APP_NAME} ${new Date().getFullYear()}</p>`,
  });
};
