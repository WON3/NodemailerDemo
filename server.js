const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const emailTemplates = require('./emailTemp.js')

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASSWORD
    }
  });

app.post('/api/getEmail',  (req, res, next) => {
    const mailOptions = {
        from: 'democodewon3@gmail.com',
        to: req.body.email,
        subject: 'High Five',
        html:emailTemplates.signUpTemp
      };

    transporter.sendMail(mailOptions)
        .then((info, err)=>{
            res.send('Email Sent')
        })
        .catch((err)=>{
            console.error(err)
        })
   
})

const port = 8089;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})