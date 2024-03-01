import debug from 'debug';
import os from 'os';
import fs from 'node:fs';

const logger = debug('app:error');

/**
 * Gère et enregistre les erreurs et renvoie une réponse appropriée au client.
 * @param {Error} err L'objet d'erreur à gérer.
 * @param {import('express').Request} _req L'objet de requête Express
 * (non utilisé dans cette fonction).
 * @param {import('express').Response} res L'objet de réponse Express.
 * @param {import('express').NextFunction} _next La fonction next de Express
 * (non utilisée dans cette fonction).
 * @returns {import('express').Response} Réponse HTTP avec le statut et les détails de l'erreur.
 */
// eslint-disable-next-line no-unused-vars
export default function handleError(err, _req, res, _next) {
  const logsPath = os.platform() === 'linux' ? 'logs/error.log' : 'logs/error.log';
  logger(err);

  const logMessage = `${new Date().toISOString()} | ${
    err.code || err.status || 500
  } | ${err.message}\n`;

  fs.appendFile(logsPath, logMessage, (error) => {
    if (error) {
      throw error;
    }
    logger('Saved!');
  });

  const statusCode = err.status || 500;

  if (statusCode === 404) {
    return res.status(statusCode).json({ error: err.message });
  }
  if (err.code === '23505' && err.constraint === 'user_username_key') {
    // Si c'est une erreur de clé dupliquée pour le nom d'utilisateur
    return res.status(409).json({
      error:
        "Le nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
    });
  }
  if (err.code === '23505' && err.constraint === 'user_email_key') {
    // Si c'est une erreur de clé dupliquée pour l'adresse e-mail
    return res.status(409).json({
      error:
        "L'adresse e-mail est déjà utilisée. Veuillez en choisir une autre.",
    });
  }
  if (statusCode === 401) {
    return res.status(statusCode).json({ error: err.message });
  }
  if (err.code === '23514' && err.constraint === 'valid_email.') {
    // Si c'est une erreur de mauvais mot de passe pour l'adresse e-mail
    return res.status(409).json({
      error: "L'adresse e-mail n'est pas valide",
    });
  }
  if (statusCode === 400) {
    return res.status(statusCode).json({ error: err.message });
  }
  return res.status(statusCode).json('Internal error');
}
