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
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    from: process.env.EMAIL_USERNAME,
  });

  const info = {
    from: `Chitsanupong <${process.env.EMAIL_USERNAME}>`,
    to: 'c.tangvasinkul@gmail.com',
    subject: 'Sending Email with Node.js',
    text: 'Hello Chitsanupong!', // plain text body
    html: `<b>Hello Chitsanupong!</b>`,
    attachments: [
      {
        filename: 'logo.jpg',
        path: './logo.jpg',
      },
    ],
  };

  // send mail with defined transport object
  await transporter.sendMail(info, (err, info) => {
    if (err) {
      res.send({ error: err }).status(500);
    } else {
      console.log('Sent: ' + info.response);
      res.send({ message: 'OK' }).status(200);
    }
  });
});

app.listen(4000, () => console.log('Listening on Port 4000'));
