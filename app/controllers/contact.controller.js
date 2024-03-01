import sendEmail from "../services/email.transporter.service.js";

export default {
  async sendMailContact(req, res) {
    const mailData = req.body;
    console.log(mailData, "mailData");
    const result = await sendEmail({
      to: "osurvivors2024@gmail.com",
      from: mailData.email,
      html: `<p>${mailData.message}</p>`,
    });
    res.json(result);
  },
};
