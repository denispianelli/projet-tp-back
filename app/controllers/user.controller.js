import bcrypt from 'bcrypt';
import { userDatamapper } from '../datamappers/index.datamapper.js';
import jwtService from '../services/jwt.service.js';
import APIError from '../services/APIError.service.js';
import { sendVerificationEmail } from '../services/email.service.js';

export default {
  async signup(req, res) {
    const { username, email, password } = req.body;

    // Hasher le mot de passe de l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur dans la base de données
    const newUser = { email, password: hashedPassword, username };
    const user = await userDatamapper.createUser(newUser);

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

  async signin(req, res) {
    // Récupération des données de connexion depuis le corps de la requête
    const login = req.body;

    // Vérification si l'utilisateur existe dans la base de données
    const result = await userDatamapper.findUserByUsername(login);
    const user = result.check_user_exists_by_username;

    if (!user) {
      throw new APIError('Les identifiants ne sont pas corrects', 401);
    }

    if (!user.is_verified) {
      sendVerificationEmail(user);

      return res
        .status(400)
        .json({
          error:
            'Veuillez vérifier votre adresse e-mail avant de vous connecter. Nous venons de vous envoyer un nouvel e-mail de vérification.',
        });
    }

    const passwordMatch = await bcrypt.compare(login.password, user.password);

    if (!passwordMatch) {
      throw new APIError('Les identifiants ne sont pas corrects', 401);
    }

    const {
      email, role, password, ...userSafeData
    } = user;

    // Génération d'un jeton d'authentification pour l'utilisateur
    const token = jwtService.generateToken(userSafeData);
    // Ajout du jeton à l'objet utilisateur et suppression du mot de
    // passe pour des raisons de sécurité
    userSafeData.token = token;

    return res.json(userSafeData);
  },

  async getUser(req, res) {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const verifiedUser = jwtService.verifyToken(token);

    if (verifiedUser.result) {
      const user = verifiedUser.result;
      const result = await userDatamapper.findUserById(user.id);
      res.json(result);
    } else {
      throw new APIError('Token invalide ou expiré.', 401);
    }
  },

  async updateUserInfos(req, res) {
    // Recuperation de l'utilisateur
    let user = req.result;
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

    const result = await userDatamapper.updateUser(user);

    res.json(result);
  },

  async getAllUnlockedCharacters(req, res) {
    const user = req.result;

    const result = await userDatamapper.getAllUnlockedCharacters(user.id);

    res.json(result);
  },

  async postUnlockCharacter(req, res) {
    const { userId } = req.body;
    const { characterId } = req.body;

    const result = await userDatamapper.postUnlockCharacter(
      userId,
      characterId,
    );

    res.json(result);
  },
};
