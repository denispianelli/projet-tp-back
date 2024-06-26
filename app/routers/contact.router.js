import { Router } from 'express';
import { contactController } from '../controllers/index.controller.js';
import controllerWrapper from '../services/controller-wrapper.service.js';
import { contactSchema } from '../services/validations/schemas.js';
import validate from '../services/validations/validate.js';

/**
 * @type {Router}
 * @description Le routeur pour les routes de contact.
 */
const router = Router();

router.post(
  '/',
  /*  #swagger.tags = ['Contact']
      #swagger.description = 'Endpoint pour envoyer un email de contact.' */
  validate('body', contactSchema),
  controllerWrapper(contactController.sendMailContact),
);

export default router;
