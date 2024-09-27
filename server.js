const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());

// Endpoint to send the lock link
app.post('/send-lock-link', (req, res) => {
    const { email, link } = req.body;

    console.log(`Received request to send lock link to: ${email}`);
    console.log(`Link: ${link}`);

    // Configure the email transport using the default SMTP transport and a GMail account.
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jainanushka670@gmail.com',
            pass: 'ggck ylqi wtix ljhz' // Use app-specific password if 2FA is enabled
        }
    });

    const mailOptions = {
        from: 'jainanushka670@gmail.com',
        to: email,
        subject: 'Lock Your Phone',
        text: `Click on the following link to lock your phone: ${link}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
});
app.get('/lock-phone', (req, res) => {
  res.send('Lock phone endpoint');
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
