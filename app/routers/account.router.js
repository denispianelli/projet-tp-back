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
  /*  #swagger.tags = ['Account']
      #swagger.description = 'Endpoint pour mettre à jour son adresse email.' */
  isMember,
  controllerWrapper(accountController.updateEmail),
);

// Mettre à jour le mot de passe
router.patch(
  '/password',
  /*  #swagger.tags = ['Account']
      #swagger.description = 'Endpoint pour mettre à jour mot de passe.' */
  isMember,
  controllerWrapper(accountController.updatePassword),
);

// Vérifier l'email
router.get(
  '/email/verifyemail',
  /*  #swagger.tags = ['Account']
      #swagger.description = 'Endpoint pour vérifier son adresse email.' */
  controllerWrapper(accountController.verifyEmail),
);

// Envoyer un email de réinitialisation du mot de passe
router.post(
  '/reset/password',
  /*  #swagger.tags = ['Account']
      #swagger.description = 'Endpoint pour faire une demande de
      réinitialisation de mot de passe.' */
  validate('body', requestPasswordResetSchema),
  controllerWrapper(accountController.requestResetPassword),
);

// Réinitialiser le mot de passe
router.patch(
  '/reset/password',
  /*  #swagger.tags = ['Account']
      #swagger.description = 'Endpoint pour réinitialiser son mot de pase.' */
  validate('body', resetPasswordSchema),
  controllerWrapper(accountController.resetPassword),
);

export default router;
