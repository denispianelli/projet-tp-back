import User from '../models/User.js';
import APIError from './APIError.service.js';
import jwtService from './jwt.service.js';

/**
 * Vérifie si l'utilisateur est membre.
 *
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} _res - L'objet de réponse HTTP (non utilisé dans cette fonction).
 * @param {Function} next - La fonction middleware pour passer à la prochaine étape.
 * @returns {Promise<void>} - Une promesse qui ne renvoie aucune valeur explicite.
 */
export async function isMember(req, _res, next) {
  const authHeader = req.get('Authorization');
  console.log('isMember ~ authHeader:', authHeader);

  if (!authHeader) {
    const err = new APIError("Vous n'êtes pas autorisé", 401);
    next(err);
  } else {
    const token = authHeader.split(' ')[1];

    const { result, error } = jwtService.verifyToken(token);

    if (result) {
      const user = await User.findById(result.id);

      if (!user) {
        const err = new APIError('Utilisateur non trouvé', 404);
        next(err);
      } else if (user.role === 'member' || user.role === 'admin') {
        req.result = user;
        next();
      } else {
        const err = new APIError("Vous n'êtes pas autorisé", 401);
        next(err);
      }
    }

    if (error) {
      const err = new APIError("Vous n'êtes pas autorisé", 401);
      next(err);
    }
  }
}

/**
 * Vérifie si l'utilisateur est un administrateur.
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} _res - L'objet de réponse HTTP (non utilisé dans cette fonction).
 * @param {Function} next - La fonction middleware pour passer à la prochaine étape.
 * @returns {Promise<void>} - Une promesse qui ne renvoie aucune valeur explicite.
 */
export async function IsAdmin(req, _res, next) {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  const { result, error } = jwtService.verifyToken(token);

  if (result) {
    const user = await User.findById(result.id);
    if (user.role === 'admin') {
      req.result = user;
      next();
    } else {
      const err = new APIError("Vous n'êtes pas autorisé", 401);
      next(err);
    }
  }

  if (error) {
    const err = new APIError("Vous n'êtes pas autorisé", 401);
    next(err);
  }
}
