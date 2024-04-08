import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export default {
  /**
   * Génère un jeton JWT (JSON Web Token) pour un utilisateur donné.
   * @param {Object} user - L'utilisateur pour lequel le jeton doit être généré.
   * @returns {string} Le jeton JWT généré.
   */
  generateToken(user) {
    return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '10h' });
  },
  /**
   * Décode un jeton JWT.
   * @param {string} token - Le jeton JWT à décoder.
   * @returns {Object} - Un objet contenant soit le jeton décodé, soit une erreur.
   */
  verifyToken(token) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

      return { result: decodedToken, error: null };
    } catch (error) {
      // Gérer différents types d'erreurs
      if (error.name === 'TokenExpiredError') {
        return {
          result: null,
          error: 'Session expirée, veuillez-vous authentifier à nouveau',
        };
      }
      if (error.name === 'JsonWebTokenError') {
        return { result: null, error: 'Authentification échouée' };
      }
      return { result: null, error: error.message };
    }
  },
};
