import { Router } from 'express';
import controllerWrapper from '../helpers/controller.wrapper.js';
import { userController } from '../controllers/index.controller.js';
import { isMember } from '../services/authorize.service.js';
// Import des schémas
import {
  signinSchema, signupSchema, resetPasswordSchema, requestPasswordResetSchema,
} from '../services/validations/schemas.js';
// Middleware de validation
import validate from '../services/validations/validate.js';

const router = Router();

router.get('/', controllerWrapper(userController.getUser));
router.get('/unlocked_character', isMember, controllerWrapper(userController.getAllUnlockedCharacters));

// Ajoutez la nouvelle route de vérification d'email
router.get('/verifyemail', controllerWrapper(userController.verifyEmail));

// La fonction validate est appelée en tant que premier argument
// suivi de la fonction controllerWrapper qui enveloppe le contrôleur correspondant
router.post('/signup', validate('body', signupSchema), controllerWrapper(userController.signup));
router.post('/signin', validate('body', signinSchema), controllerWrapper(userController.signin));
router.post('/unlocked_character', isMember, controllerWrapper(userController.postUnlockCharacter));

// Demande de réinitialisation du mot de passe
router.post('/requestreset', validate('body', requestPasswordResetSchema), controllerWrapper(userController.requestPasswordReset));
// Réinitialisation du mot de passe
router.patch('/resetpassword', validate('body', resetPasswordSchema), controllerWrapper(userController.resetPassword));

router.patch('/', isMember, controllerWrapper(userController.updateUserInfos));

export default router;
