import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get('/', (req, res) => {
  res.status(200).send('Backend is running');
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await resend.emails.send({
      from: 'Cinnamon Cafe <info@cinnamoncafrestaurant.com>',
      to: ['info@cinnamoncafrestaurant.com'],
      subject: `New contact from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #222;">
          <h2 style="margin-bottom: 16px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <hr style="margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Error sending email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});