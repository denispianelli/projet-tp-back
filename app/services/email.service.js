import nodemailer from 'nodemailer';
import debug from 'debug';
import jwtService from './jwt.service.js';

const logger = debug('app:transporter');

async function sendEmail({
  to, subject, text, html,
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'osurvivors2024@gmail.com',
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger(`Email envoyé: ${info.response}`);
  } catch (error) {
    logger(`Erreur lors de l'envoi de l'email: ${error}`);
    throw error;
  }
}

async function sendVerificationEmail(user) {
  const verificationToken = jwtService.generateToken({ id: user.id, username: user.username });
  // const verificationUrl = `${process.env.BASE_URL}${process.env.PORT}/v1/api/account/email/verifyemail?token=${verificationToken}`;
  const verificationUrl = `${process.env.ORIGIN_URL}/account/email-verified/verifyemail?token=${verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Vérification de votre adresse email',
    html: `<p>Merci de vous être inscrit. Veuillez cliquer sur le lien suivant pour vérifier votre adresse email: <a href="${verificationUrl}">Vérifier l'email</a></p>`,
  });
}

async function sendResetPasswordEmail(user, req) {
  const resetToken = jwtService.generateToken({ id: user.id, email: user.email });
  const resetUrl = `${process.env.ORIGIN_URL}/account/reset/password/resetpassword?token=${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Réinitialisation du mot de passe',
    html: `
    <h1 style="color: #333;">Réinitialisation du mot de passe</h1>
    <p style="font-size: 16px;">Une demande de réinitialisation de mot de passe a été effectuée pour votre compte.</p>
    <p style    font-size: 16px;">La fenêtre de validité de ce lien est de 10 heures.</p>
    <p style="font-size: 16px;">Si vous n'avez pas demandé la réinitialisation de mot de passe, veuillez ignorer cette notification.</p>
    <p style="font-size: 16px;">Pour commencer la procédure de réinitialisation, veuillez cliquer sur le lien suivant:</p>
    <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Réinitialiser le mot de passe</a>
    <p style="font-size: 16px;">Pseudo: ${user.username}</p>
    <p style="font-size: 16px;">Adresse IP: ${req.ip}</p>
    <p style="font-size: 16px;">Date de la demande: ${new Date().toLocaleString()}</p>
    `,
  });
}

export { sendEmail, sendVerificationEmail, sendResetPasswordEmail };
