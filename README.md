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

## SendGrid
