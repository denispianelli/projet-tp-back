import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import { userController } from '../controllers/index.controller.js';
import { isMember } from '../services/authorize.service.js';
import { signinSchema, signupSchema } from '../services/validations/schemas.js';
import validate from '../services/validations/validate.js';

/**
 * Router pour les utilisateurs.
 * @type {Router}
 */
const router = Router();

// CREATE
router.post(
  '/signup',
  validate('body', signupSchema),
  controllerWrapper(userController.signup),
);

// READ
router.get('/', isMember, controllerWrapper(userController.getUser));

// UPDATE
router.patch('/', isMember, controllerWrapper(userController.updateUserInfos));

// DELETE
router.delete('/', isMember, controllerWrapper(userController.deleteUser));

router.post(
  '/signin',
  validate('body', signinSchema),
  controllerWrapper(userController.signin),
);

router.get(
  '/characters',
  isMember,
  controllerWrapper(userController.getAllUnlockedCharacters),
);

router.post(
  '/characters/:characterId',
  isMember,
  controllerWrapper(userController.unlockCharacter),
);

export default router;
