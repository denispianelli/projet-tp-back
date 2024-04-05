import { sendEmail } from '../services/email.service.js';

export default {
  async sendMailContact(req, res) {
    const mailData = req.body;

    const result = await sendEmail({
      to: 'denis.pianelli@gmail.com',
      subject: mailData.object,
      html: `
      <p>${mailData.message}</p>
      <p>Envoyé par: ${mailData.username}</p>
      <p>Envoyé par: ${mailData.email}</p>`,
    });

    res.json(result);
  },
};
