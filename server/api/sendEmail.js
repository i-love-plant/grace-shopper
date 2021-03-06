"use strict";

const router = require("express").Router();
const { Order, User} = require("../db/models");
// const { isAdmin } = require("../gatekeeper.js");
const { isLoggedIn } = require('../gatekeeper.js')
module.exports = router;
const nodemailer = require("nodemailer");

router.post('/confirmation', (req, res, next) => {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
	nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'wz3kbiyihwb3aqxb@ethereal.email', // generated ethereal user
            pass: 'U9eetH5nHbfbvvzRhy'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"I Love Plant" <admin@iloveplant.com>', // sender address
        to: req.body.email, // list of receivers
        subject: `Order confirmation #${req.body.orderId}!`, // Subject line
        text: 'Hello world?', // plain text body
        html: `<b>Hey there! \n Thank you for your order! The total was $${req.body.total}. We will ship it shortly!</b>` // html body
    };


  
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
})


  
})

