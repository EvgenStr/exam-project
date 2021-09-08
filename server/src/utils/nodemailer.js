const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'dev.str.88@gmail.com', // generated ethereal user
    pass: '291087pp', // generated ethereal password
  },
});
