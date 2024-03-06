import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import { accountController } from '../controllers/index.controller.js';
import { resetPasswordSchema, requestPasswordResetSchema } from '../services/validations/schemas.js';
import validate from '../services/validations/validate.js';

const router = Router();

router.get('/email/verifyemail', controllerWrapper(accountController.verifyEmail));

router.post('/reset/password', validate('body', requestPasswordResetSchema), controllerWrapper(accountController.requestPasswordReset));

router.patch('/reset/password', validate('body', resetPasswordSchema), controllerWrapper(accountController.resetPassword));

export default router;
