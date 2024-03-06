import bcrypt from 'bcrypt';
import userDatamapper from '../datamappers/user.datamapper.js';
import { sendResetPasswordEmail } from '../services/email.service.js';
import jwtService from '../services/jwt.service.js';
import APIError from '../services/APIError.service.js';

export default {
  async verifyEmail(req, res) {
    const { token } = req.query;
    const { result, error } = jwtService.verifyToken(token);

    if (error) {
      throw new APIError('Token invalide ou expiré.', 401);
    }

    if (result) {
      const user = await userDatamapper.findUserById(result.id);
      if (user.is_verified) {
        return res
          .status(400)
          .json({ message: "L'utilisateur est déjà vérifié." });
      }

      user.is_verified = true;
      const verifiedUser = await userDatamapper.updateUser(user);

      // Vérification de la réussite de l'opération de mise à jour
      if (!verifiedUser) {
        throw new Error('La mise à jour de l’utilisateur a échoué.');
      }
    }

    return res.send({
      message: 'Email vérifié avec succès. Votre compte est maintenant actif.',
    });
  },

  async requestResetPassword(req, res) {
    // Récupération de l'email depuis le corps de la requête
    const userData = req.body;
    // Vérification si l'utilisateur existe dans la base de données
    const user = await userDatamapper.findUserByEmail(userData);

    if (!user) {
      throw new APIError(
        'La demande de réinitialisation du mot de passe a été traitée avec succès. Si un compte est associé à cette adresse e-mail, un e-mail de réinitialisation du mot de passe sera envoyé.',
        200,
      );
    }

    sendResetPasswordEmail(user, req);

    return res.status(200).json({
      message:
        'La demande de réinitialisation du mot de passe a été traitée avec succès. Si un compte est associé à cette adresse e-mail, un e-mail de réinitialisation du mot de passe sera envoyé.',
    });
  },

  async resetPassword(req, res) {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    // Vérification du token
    const { result, error } = jwtService.verifyToken(token);

    if (error) {
      throw new APIError(error, 401);
    }

    const { newPassword } = req.body;

    let user = await userDatamapper.findUserById(result.id);

    if (!user) {
      throw new APIError('Utilisateur non trouvé.', 404);
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user = { ...user, password: hashedPassword };

    // Mise à jour du mot de passe dans la base de données
    const response = await userDatamapper.updateUser(user);

    if (!response) {
      throw new APIError('La mise à jour du mot de passe a échoué.', 500);
    }

    return res.status(200).json({
      message: 'Le mot de passe a été réinitialisé avec succès.',
    });
  },
};
