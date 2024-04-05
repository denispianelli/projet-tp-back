import { Router } from 'express';
import { contactController } from '../controllers/index.controller.js';
import controllerWrapper from '../services/controller-wrapper.service.js';
import { contactSchema } from '../services/validations/schemas.js';
import validate from '../services/validations/validate.js';

const router = Router();

router.post(
  '/',
  validate('body', contactSchema),
  controllerWrapper(contactController.sendMailContact),
);

export default router;
