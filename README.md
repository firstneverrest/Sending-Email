# Sending Email with Node.js

In order to send an email, you need to use Simple Mail Transfer Protocol (SMTP). SMTP is part of the application layer of the TCP/IP Protocol.
There are two choices to send the email via Node.js:

1. Use node.js send email via SMTP to Email Server directly
2. Use node.js send HTTP request to Email Delivery Service. It then sends email to Email Server via SMTP to Email Server.

The advantage of the second choice is you can choose beautiful style without write your own HTML & CSS code. It helps reduce time to code and easy to send email.

## Nodemailer

Nodemailer is a module for node.js applications to allow email sending.

```
npm install nodemailer
```

```js
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
```

To send e-mail via g-mail, you need to turn on the less secure app access in your google account. Then, change service name.

```js
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
  from: process.env.EMAIL_USERNAME,
});
```

## SendGrid
