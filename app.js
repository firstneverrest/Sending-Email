const express = require('express');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: './.env' });

const app = express();

// template engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// body parser middleware (body parser is deprecated for express v 4.16 +)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
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
    from: `${req.body.name} <${process.env.EMAIL_USERNAME}>`,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.content, // plain text body
    attachments: [
      {
        filename: 'logo.jpg',
        path: './logo.jpg',
      },
    ],
  };

  // send mail with defined transport object
  transporter.sendMail(info, (err, info) => {
    if (err) {
      console.log(err);
      res.send({ error: err }).status(500);
    } else {
      console.log('Sent: ' + info.response);
      res.send({ message: 'OK' }).status(200);
    }
  });
});

app.post('/send-gmail', async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
    from: process.env.EMAIL_USERNAME,
  });

  const info = {
    from: `${req.body.name} <${process.env.EMAIL_USERNAME}>`,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.content, // plain text body
    attachments: [
      {
        filename: 'logo.jpg',
        path: './logo.jpg',
      },
    ],
  };

  // send mail with defined transport object
  transporter.sendMail(info, (err, info) => {
    if (err) {
      console.log(err);
      res.send({ error: err }).status(500);
    } else {
      console.log('Sent: ' + info.response);
      res.send({ message: 'OK' }).status(200);
    }
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
