import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import { userController } from '../controllers/index.controller.js';
import { isMember } from '../services/authorize.service.js';
// Import des schémas
import { signinSchema, signupSchema } from '../services/validations/schemas.js';
// Middleware de validation
import validate from '../services/validations/validate.js';

const router = Router();

router.get('/', controllerWrapper(userController.getUser));
router.get('/unlocked_character', isMember, controllerWrapper(userController.getAllUnlockedCharacters));

router.get('/verifyemail', controllerWrapper(userController.verifyEmail));

router.post('/signup', validate('body', signupSchema), controllerWrapper(userController.signup));
router.post('/signin', validate('body', signinSchema), controllerWrapper(userController.signin));
router.post('/unlocked_character', isMember, controllerWrapper(userController.postUnlockCharacter));

router.patch('/', isMember, controllerWrapper(userController.updateUserInfos));

export default router;
