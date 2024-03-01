import nodemailer from "nodemailer";
import debug from "debug";

const logger = debug("app:transporter");

// Créez une fonction pour envoyer des emails
async function sendEmail({ to, subject, text, html }) {
  // Configuration du transporteur avec les paramètres SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "osurvivors2024@gmail.com",
      pass: "oofp pfxr vzal msba",
    },
  });
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   auth: {
  //     user: "eldridge51@ethereal.email",
  //     pass: "PM6YVVPg1wdKg5Aqrs",
  //   },
  // });
  // Options de l'email
  const mailOptions = {
    from: "osurvivors2024@gmail.com", // L'expéditeur est défini via variable d'environnement
    to, // Destinataires de l'email
    subject, // Sujet de l'email
    text, // Corps de l'email en texte brut
    html, // Corps de l'email en HTML
  };

  // Envoi de l'email
  try {
    const info = await transporter.sendMail(mailOptions);
    logger(`Email envoyé: ${info.response}`);
  } catch (error) {
    logger(`Erreur lors de l'envoi de l'email: ${error}`);
    throw error;
  }
}

export default sendEmail;
