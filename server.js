import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend('TU_API_KEY');

app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await resend.emails.send({
      from: 'Cinnamon Cafe <info@cinnamoncafrestaurant.com>',
      to: ['info@cinnamoncafrestaurant.com'],
      subject: `New contact from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || 'N/A'}</p>
          <hr/>
          <p><b>Message:</b></p>
          <p>${message}</p>
        </div>
      `,
    });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(3001, () => {
  console.log('Server running');
});