import { sendEmail } from '../services/email.service.js';

export default async function sendMailContact(req, res) {
  const mailData = req.body;

  const result = await sendEmail({
    to: 'osurvivors2024@gmail.com',
    from: mailData.email,
    html: `<p>${mailData.message}</p>`,
  });

  res.json(result);
}
