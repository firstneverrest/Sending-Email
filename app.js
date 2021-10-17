const { ESRCH } = require('constants');
const express = require('express');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: './.env' });

const app = express();

// template engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// body parser middleware (body parser is deprecated for express v 4.16 +)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('contact', { layout: false });
});

app.post('/send-email', async (req, res) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `Chitsanupong <${process.env.EMAIL_USERNAME}>`, // sender address
      to: 'c.tangvasinkul@gmail.com', // list of receivers
      subject: 'Sending Email with Node.js', // Subject line
      // text: 'Hello world?', // plain text body
      html: '<b>Hello Chitsanupong!</b>', // html body
    });

    console.log('Sent: ' + info.response);

    console.log('Message sent: %s', info.messageId);
    res.send({ message: 'OK' }).status(200);
  } catch (error) {
    res.send({ error: error }).status(500);
  }
});

app.listen(4000, () => console.log('Listening on Port 4000'));
