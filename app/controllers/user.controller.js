import bcrypt from 'bcrypt';
import jwtService from '../services/jwt.service.js';
import APIError from '../services/APIError.service.js';
import { sendVerificationEmail } from '../services/email.service.js';
import User from '../models/User.js';

export default {
  // CREATE
  async signup(req, res) {
    const { username, email, password } = req.body;

    // Hasher le mot de passe de l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur dans la base de données
    const data = { email, password: hashedPassword, username };

    const user = await User.create(data);

    sendVerificationEmail(user);

    return res.status(201).json({
      message:
        'Inscription réussie. Un email de vérification a été envoyé à votre adresse email.',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  },

  // READ
  async getUser(req, res) {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const verifiedUser = jwtService.verifyToken(token);

    const { result, error } = verifiedUser;

    if (result) {
      const userFound = await User.findById(result.id);
      res.json(userFound);
    } else {
      throw new APIError(error, 401);
    }
  },

  // UPDATE
  async updateUserInfos(req, res) {
    // Recuperation de l'utilisateur
    let user = req.result;
    const userId = user.id;
    const userData = req.body;
    const { password, newPassword, passwordConfirmation } = userData;

    if (password) {
      const isPasswordAMatch = await bcrypt.compare(password, user.password);
      const isPasswordConfirmed = newPassword === passwordConfirmation;

      if (!isPasswordAMatch) {
        throw new APIError('Mot de passe incorrect.', 401);
      } else if (!isPasswordConfirmed) {
        throw new APIError('Confirmation de mot de passe echouée.', 400);
      }

      userData.password = await bcrypt.hash(newPassword, 10);
    }

    user = { ...user, ...userData };
    delete user.id;

    const result = await User.update(userId, user);

    res.json(result);
  },

  // DELETE
  async deleteUser(req, res) {
    const user = req.result;
    const userId = user.id;

    const result = await User.delete(userId);

    res.json(result);
  },

  async signin(req, res) {
    // Récupération des données de connexion depuis le corps de la requête
    const login = req.body;

    // Vérification si l'utilisateur existe dans la base de données
    const user = await User.findByUsername(login.username);

    if (!user) {
      throw new APIError('Les identifiants ne sont pas corrects', 401);
    }

    if (!user.is_verified) {
      sendVerificationEmail(user);

      return res.status(400).json({
        error:
          'Veuillez vérifier votre adresse e-mail avant de vous connecter. Nous venons de vous envoyer un nouvel e-mail de vérification.',
      });
    }

    const passwordMatch = await bcrypt.compare(login.password, user.password);

    if (!passwordMatch) {
      throw new APIError('Les identifiants ne sont pas corrects', 401);
    }

    const { email, password, ...userSafeData } = user;

    // Génération d'un jeton d'authentification pour l'utilisateur
    const token = jwtService.generateToken(userSafeData);
    // Ajout du jeton à l'objet utilisateur et suppression du mot de
    // passe pour des raisons de sécurité
    userSafeData.token = token;

    return res.json(userSafeData);
  },

  async getAllUnlockedCharacters(req, res) {
    const user = req.result;

    const result = await User.getAllUnlockedCharacters(user.id);

    res.json(result);
  },

  async unlockCharacter(req, res) {
    const user = req.result;
    const userId = user.id;
    let { characterId } = req.params;
    characterId = parseInt(characterId, 10);

    const result = await User.unlockCharacter(userId, characterId);

    res.json(result);
  },
};
