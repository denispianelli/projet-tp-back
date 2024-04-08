import APIError from './APIError.service.js';

/**
 * Middleware pour gérer les erreurs de type "Not Found".
 * @param {Object} _req - L'objet de requête HTTP.
 * @param {Object} _res - L'objet de réponse HTTP.
 * @param {Function} next - La fonction pour passer au middleware suivant.
 */
export default function notFound(_req, _res, next) {
  const err = new APIError('Not Found', 404);
  next(err);
}
