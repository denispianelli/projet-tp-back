import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import { accountController } from '../controllers/index.controller.js';
import { resetPasswordSchema, requestPasswordResetSchema } from '../services/validations/schemas.js';
import validate from '../services/validations/validate.js';
import { isMember } from '../services/authorize.service.js';

const router = Router();

// Update email
router.patch('/email', isMember, controllerWrapper(accountController.updateEmail));

// Update password
router.patch('/password', isMember, controllerWrapper(accountController.updatePassword));

// Verify email
router.get('/email/verifyemail', controllerWrapper(accountController.verifyEmail));

// Send reset password email
router.post('/reset/password', validate('body', requestPasswordResetSchema), controllerWrapper(accountController.requestResetPassword));

// Reset password
router.patch('/reset/password', validate('body', resetPasswordSchema), controllerWrapper(accountController.resetPassword));

export default router;
