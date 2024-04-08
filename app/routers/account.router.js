import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import { accountController } from '../controllers/index.controller.js';
import {
  resetPasswordSchema,
  requestPasswordResetSchema,
} from '../services/validations/schemas.js';
import validate from '../services/validations/validate.js';
import { isMember } from '../services/authorize.service.js';

/**
 * Router pour les comptes.
 * @type {Router}
 */
const router = Router();

// Mettre à jour l'email
router.patch(
  '/email',
  isMember,
  controllerWrapper(accountController.updateEmail),
);

// Mettre à jour le mot de passe
router.patch(
  '/password',
  isMember,
  controllerWrapper(accountController.updatePassword),
);

// Vérifier l'email
router.get(
  '/email/verifyemail',
  controllerWrapper(accountController.verifyEmail),
);

// Envoyer un email de réinitialisation du mot de passe
router.post(
  '/reset/password',
  validate('body', requestPasswordResetSchema),
  controllerWrapper(accountController.requestResetPassword),
);

// Réinitialiser le mot de passe
router.patch(
  '/reset/password',
  validate('body', resetPasswordSchema),
  controllerWrapper(accountController.resetPassword),
);

export default router;
