import bcrypt from 'bcrypt';
import { userDatamapper } from '../datamappers/index.datamapper.js';
import jwt from '../services/jwt.service.js';
import sendEmail from '../services/email.transporter.service.js';

export default {

  async signup(req, res) {
    const userData = req.body; // Utilisation directe de l'objet user fourni par req.body
    // Hasher le mot de passe de l'utilisateur
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Mettre à jour l'objet utilisateur avec le mot de passe hashé
    userData.password = hashedPassword;

    // Créer l'utilisateur dans la base de données
    const result = await userDatamapper.createUser(userData);
    // Vérifier si l'utilisateur a bien été créé avant de continuer
    if (!result) {
      return res.status(400).json({ error: "Erreur lors de la création de l'utilisateur." });
    }

    // Génération du token JWT pour la vérification de l'email
    const user = result[0];
    delete user.email;
    delete user.password;
    delete user.role;
    delete user.coins;
    delete user.is_verified;

    const verificationToken = jwt.generateToken(result[0]);
    const verificationUrl = `${process.env.BASE_URL}${process.env.PORT}/v1/api/user/verifyemail?token=${verificationToken}`;

    // Envoyer l'email de vérification
    await sendEmail({
      to: userData.email,
      subject: 'Vérification de votre adresse email',
      html: `<p>Merci de vous être inscrit. Veuillez cliquer sur le lien suivant pour vérifier votre adresse email: <a href="${verificationUrl}">Vérifier l'email</a></p>`,
    });

    return res.status(201).json({
      message: 'Inscription réussie. Un email de vérification a été envoyé à votre adresse email.',
      user: {
        id: userData.id,
        email: userData.email, // Ne renvoyez pas le mot de passe ou d'autres informations sensibles
      },
    });
  },

  async verifyEmail(req, res) {
    const { token } = req.query; // Extrait le token du paramètre de requête
    const decoded = jwt.verifyToken(token);
    if (!decoded) {
      // Si le token ne peut pas être décodé pour une raison quelconque, renvoie une erreur
      return res.status(400).send('Token invalide ou expiré.');
    }
    const user = await userDatamapper.getUser(decoded.result.id);
    user.is_verified = true;
    const userUpdated = await userDatamapper.updateUser(user);

    if (!userUpdated) {
      // Si aucun utilisateur n'est trouvé ou si la mise à jour échoue, renvoie une erreur
      return res.status(404).send('Utilisateur non trouvé ou mise à jour échouée.');
    }
    // Si tout se passe bien, envoie une confirmation
    return res.send('Email vérifié avec succès. Votre compte est maintenant actif.');
  },

  // eslint-disable-next-line consistent-return
  async signin(req, res, next) {
    // Récupération des données de connexion depuis le corps de la requête
    const login = req.body;

    // Vérification si l'utilisateur existe dans la base de données
    const result = await userDatamapper.checkUserExists(login);
    const user = result.check_user_exists;
    console.log('🚀 ~ signin ~ user:', user);

    if (user === null) {
      next();
    }

    if (user.is_verified === false) {
      return res.status(400).json({ error: 'Veuillez vérifier votre adresse email avant de vous connecter.' });
    }

    // Vérification du mot de passe si l'utilisateur existe
    if (user && await bcrypt.compare(login.password, user.password)) {
      delete user.email;
      delete user.role;
      delete user.password;

      // Génération d'un jeton d'authentification pour l'utilisateur
      const token = jwt.generateToken(user);
      // Ajout du jeton à l'objet utilisateur et suppression du mot de
      // passe pour des raisons de sécurité
      user.token = token;

      res.json(user);
    } else { // Si les identifiants ne sont pas corrects, envoi d'une erreur 401 (non autorisé)
      const error = new Error('Les identifiants ne sont pas corrects');
      error.status = 401;
      next(error);
    }
  },

  async getUser(req, res, next) {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

    const verifiedUser = jwt.verifyToken(token);

    if (verifiedUser.result) {
      const user = verifiedUser.result;
      const result = await userDatamapper.getUser(user.id);
      res.json(result);
    } else {
      const error = new Error('Authentification échouée');
      error.status = 401;
      next(error);
    }
  },

  async updateUserInfos(req, res, next) {
    // Recuperation de l'utilisateur
    let user = req.result;
    let error;

    // Sinon on recupere et stock les donnees du formulaire
    const userData = req.body;

    if (userData.password) {
      const { password } = userData;
      const { newPassword } = userData;
      const { passwordConfirmation } = userData;

      const isPasswordAMatch = await bcrypt.compare(password, user.password);

      const isPasswordConfirmed = newPassword === passwordConfirmation;

      if (!isPasswordAMatch) {
        error = new Error('Mot de passe incorrect.');
        error.status = 401;
        next(error);
      } else if (!isPasswordConfirmed) {
        error = new Error('Confirmation de mot de passe echouée.');
        error.status = 400;
        next(error);
      } else {
        userData.password = await bcrypt.hash(userData.newPassword, 10);

        user = { ...user, ...userData };
        const result = await userDatamapper.updateUser(user);
        if (result) {
          res.json(result);
        } else {
          next();
        }
      }
    } else {
      user = { ...user, ...userData };

      const result = await userDatamapper.updateUser(user);
      if (result) {
        res.json(result);
      } else {
        next();
      }
    }
  },

  async requestPasswordReset(req, res) {
    // Récupération de l'email depuis le corps de la requête
    const userData = req.body;
    console.log(userData, 'userData');
    // Vérification si l'utilisateur existe dans la base de données
    const user = await userDatamapper.findUserByEmail(userData);
    console.log(user, 'user');

    if (!user) {
      return res.status(404).send('Utilisateur non trouvé.');
    }

    // Génération du token de réinitialisation
    const resetToken = jwt.generateToken({ id: user.id });
    const resetUrl = `${process.env.ORIGIN_URL}/changer-mot-de-passe?token=${resetToken}`;

    if (user.is_verified === false) {
      return res.status(400).send('Veuillez vérifier votre adresse email avant de réinitialiser votre mot de passe.');
    }

    // Envoyer l'email avec le lien de réinitialisation
    await sendEmail({
      to: user.email,
      subject: 'Réinitialisation du mot de passe',
      html: `<p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe: <a href="${resetUrl}">Réinitialiser le mot de passe</a></p>`,
    });

    return res.send('Email de réinitialisation du mot de passe envoyé.');
  },

  async resetPassword(req, res) {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];
    const userUpdatedPassword = {};
    console.log(token, 'token');
    const { newPassword } = req.body;
    console.log(newPassword, 'newPassword');

    // Vérification du token
    const decoded = jwt.verifyToken(token);
    if (!decoded) {
      return res.status(400).send('Token invalide ou expiré.');
    }
    console.log(decoded, 'decoded');
    const user = await userDatamapper.getUser(decoded.result.id);
    console.log(user, 'user');
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé.');
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userUpdatedPassword.password = hashedPassword;

    // Mettre à jour l'objet utilisateur avec le mot de passe hashé
    const updatedUserData = { ...user, ...userUpdatedPassword };
    console.log(updatedUserData, 'updatedUserData');

    // Mise à jour du mot de passe dans la base de données
    const result = await userDatamapper.updateUser(updatedUserData);

    if (!result) {
      return res.status(500).send('Erreur lors de la mise à jour du mot de passe.');
    }

    return res.send('Mot de passe réinitialisé avec succès.');
  },

  async getAllUnlockedCharacters(req, res) {
    const user = req.result;

    const result = await userDatamapper.getAllUnlockedCharacters(user.id);

    res.json(result);
  },
  async postUnlockCharacter(req, res) {
    const { userId } = req.body;
    const { characterId } = req.body;

    const result = await userDatamapper.postUnlockCharacter(userId, characterId);

    res.json(result);
  },
};
