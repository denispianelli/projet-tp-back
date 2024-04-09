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
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint pour s\'inscrire.' */

  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Information de l\'utilisateur.',
         required: true,
         schema: { $ref: "#/definitions/Adduser" }
  } */
  validate('body', signupSchema),
  controllerWrapper(userController.signup),
);

// READ
router.get(
  '/',
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint pour récupérer l\'utilisateur.' */

  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  isMember,
  controllerWrapper(userController.getUser),
);

// UPDATE
router.patch(
  '/',
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint pour modifier l\'utilisateur.' */
  isMember,
  controllerWrapper(userController.updateUserInfos),
);

// DELETE
router.delete(
  '/',
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint pour supprimer l\'utilisateur.' */
  isMember,
  controllerWrapper(userController.deleteUser),
);

router.post(
  '/signin',
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint pour se connecter.' */
  validate('body', signinSchema),
  controllerWrapper(userController.signin),
);

router.get(
  '/characters',
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint pour récupérer tous les personnages
      débloqués de l\'utilisateur.' */
  isMember,
  controllerWrapper(userController.getAllUnlockedCharacters),
);

router.post(
  '/characters/:characterId',
  /*  #swagger.tags = ['User']
      #swagger.description = 'Endpoint pour débloquer un nouveau personnage pour
      l\'utilisateur.' */
  isMember,
  controllerWrapper(userController.unlockCharacter),
);

export default router;
