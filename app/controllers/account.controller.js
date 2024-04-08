import bcrypt from 'bcrypt';
import { sendResetPasswordEmail } from '../services/email.service.js';
import jwtService from '../services/jwt.service.js';
import APIError from '../services/APIError.service.js';
import User from '../models/User.js';

export default {
  // Vérifie l'email de l'utilisateur
  async verifyEmail(req, res) {
    const { token } = req.query;
    const { result, error } = jwtService.verifyToken(token);

    if (error) {
      throw new APIError('Token invalide ou expiré.', 401);
    }

    if (result) {
      const user = await User.findById(result.id);
      const userId = user.id;
      delete user.id;

      if (user.is_verified) {
        throw new APIError("L'utilisateur est déjà vérifié.", 400);
      }

      user.is_verified = true;
      const verifiedUser = await User.update(userId, user);

      if (!verifiedUser) {
        throw new Error('La mise à jour de l’utilisateur a échoué.');
      }
    }

    return res.send({
      message: 'Email vérifié avec succès. Votre compte est maintenant actif.',
    });
  },

  // Envoie une demande de réinitialisation du mot de passe
  async requestResetPassword(req, res) {
    // Récupération de l'email depuis le corps de la requête
    const userData = req.body;
    // Vérification si l'utilisateur existe dans la base de données
    const user = await User.findByUsername(userData.username);

    if (!user) {
      throw new APIError('Utilisateur non trouvé.', 404);
    }

    if (userData.username !== user.username || userData.email !== user.email) {
      return res.status(200).json({
        message:
          'La demande de réinitialisation du mot de passe a été traitée avec succès. Si un compte est associé à cette adresse e-mail, un e-mail de réinitialisation du mot de passe sera envoyé.',
      });
    }

    sendResetPasswordEmail(user, req);

    return res.status(200).json({
      message:
        'La demande de réinitialisation du mot de passe a été traitée avec succès. Si un compte est associé à cette adresse e-mail, un e-mail de réinitialisation du mot de passe sera envoyé.',
    });
  },

  // Réinitialise le mot de passe de l'utilisateur
  async resetPassword(req, res) {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    // Vérification du token
    const { result, error } = jwtService.verifyToken(token);

    if (error) {
      throw new APIError(error, 401);
    }

    const { newPassword, passwordConfirmation } = req.body;

    if (newPassword !== passwordConfirmation) {
      throw new APIError('Les mots de passe ne correspondent pas.', 400);
    }

    let user = await User.findById(result.id);
    const userId = user.id;
    delete user.id;

    if (!user) {
      throw new APIError('Utilisateur non trouvé.', 404);
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user = { ...user, password: hashedPassword };

    // Mise à jour du mot de passe dans la base de données
    const response = await User.update(userId, user);

    if (!response) {
      throw new APIError('La mise à jour du mot de passe a échoué.', 500);
    }

    return res.status(200).json({
      message: 'Le mot de passe a été réinitialisé avec succès.',
    });
  },

  // Met à jour l'email de l'utilisateur
  async updateEmail(req, res) {
    const user = req.result;
    const userId = user.id;
    delete user.id;

    const { email } = req.body;
    const { password } = req.body;

    // Vérification du mot de passe
    const isPasswordAMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordAMatch) {
      throw new APIError('Mot de passe incorrect.', 401);
    }

    user.email = email;

    const response = await User.update(userId, user);

    if (!response) {
      throw new APIError('La mise à jour de l’email a échoué.', 500);
    }

    return res.status(200).json(response);
  },

  // Met à jour le mot de passe de l'utilisateur
  async updatePassword(req, res) {
    const user = req.result;
    const userId = user.id;
    delete user.id;

    const { oldPassword, newPassword, passwordConfirmation } = req.body;

    const isPasswordAMatch = await bcrypt.compare(oldPassword, user.password);
    const isPasswordConfirmed = newPassword === passwordConfirmation;

    if (!isPasswordAMatch) {
      throw new APIError('Mot de passe incorrect.', 401);
    } else if (!isPasswordConfirmed) {
      throw new APIError('Confirmation de mot de passe échouée.', 400);
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    const response = await User.update(userId, user);

    if (!response) {
      throw new APIError('La mise à jour du mot de passe a échoué.', 500);
    }

    return res.status(200).json(response);
  },
};
