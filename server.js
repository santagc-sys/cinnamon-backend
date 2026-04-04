app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    console.log('ENV exists:', !!process.env.RESEND_API_KEY);
    console.log('ENV prefix:', process.env.RESEND_API_KEY?.slice(0, 12));
    console.log('FROM address:', 'info@cinnamoncafrestaurant.com');

    const result = await resend.emails.send({
      from: 'Cinnamon Cafe <info@cinnamoncafrestaurant.com>',
      to: ['santagc@gmail.com'],
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

    console.log('Resend result:', JSON.stringify(result, null, 2));

    if (result.error) {
      return res.status(500).json({
        success: false,
        error: result.error,
      });
    }

    return res.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Error sending email',
    });
  }
});