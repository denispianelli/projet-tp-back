import debug from 'debug';
import fs from 'node:fs';
import APIError from './APIError.service.js';

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
  const logsPath = 'logs/error.log';
  logger(err.status || err.code, err.stack, err.constraint);

  // Enregistre le message d'erreur dans le fichier de logs
  const logMessage = `${new Date().toISOString()} | ${err.status || err.code} | ${err.message}\n`;

  fs.appendFile(logsPath, logMessage, (error) => {
    if (error) {
      throw error;
    }
    logger('Saved!');
  });

  const statusCode = err.status || 500;

  if (err instanceof APIError) {
    if (process.env.NODE_ENV === 'development') {
      // Retourne une réponse JSON avec les détails de l'erreur en mode développement
      return res.status(statusCode).json({
        status: 'error',
        error: err.message,
        stack: err.stack,
        constraint: err.constraint,
      });
    }
    // Retourne une réponse JSON avec les détails de l'erreur en dehors du mode développement
    return res.status(statusCode).json({
      status: 'error',
      error: err.message,
      constraint: err.constraint,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    // Retourne une réponse JSON avec les détails de l'erreur générique en mode développement
    return res.status(500).json({
      status: 'error',
      error: err.message,
      stack: err.stack,
      constraint: err.constraint,
    });
  }

  // Retourne une réponse JSON avec les détails de l'erreur générique en dehors du mode
  // développement
  return res.status(500).json({
    status: 'error',
    error: err.message,
    constraint: err.constraint,
  });
}
