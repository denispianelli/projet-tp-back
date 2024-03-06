import { Router } from 'express';
import userRouter from './user.router.js';
import characterRouter from './character.router.js';
import getController from '../controllers/get.controller.js';
import accountRouter from './account.router.js';
import contactController from '../controllers/contact.controller.js';
import controllerWrapper from '../services/controller-wrapper.service.js';
import {
  contactSchema,
} from '../services/validations/schemas.js';
import validate from '../services/validations/validate.js';

const router = Router();

router.post('/contact', validate('body', contactSchema), controllerWrapper(contactController.sendMailContact));

router.use('/user', userRouter);
router.use('/account', accountRouter);
router.use('/character', characterRouter);
router.get('/:tableName', controllerWrapper(getController.getAll));

export default router;
