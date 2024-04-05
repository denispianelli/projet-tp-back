import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import { userController } from '../controllers/index.controller.js';
import { isMember } from '../services/authorize.service.js';
// Import des schémas
import { signinSchema, signupSchema } from '../services/validations/schemas.js';
// Middleware de validation
import validate from '../services/validations/validate.js';

const router = Router();

// CREATE
router.post('/signup', validate('body', signupSchema), controllerWrapper(userController.signup));

// READ
router.get('/', isMember, controllerWrapper(userController.getUser));

// UPDATE
router.patch('/', isMember, controllerWrapper(userController.updateUserInfos));

// DELETE
router.delete('/', isMember, controllerWrapper(userController.deleteUser));

router.post('/signin', controllerWrapper(userController.signin));

router.get('/characters', isMember, controllerWrapper(userController.getAllUnlockedCharacters));

router.post('/characters/:characterId', isMember, controllerWrapper(userController.unlockCharacter));

export default router;
