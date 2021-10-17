const express = require('express');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const app = express();

// template engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body parser middleware (body parser is deprecated for express v 4.16 +)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(4000, () => console.log('Listening on Port 4000'));
