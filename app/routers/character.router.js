import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import characterController from '../controllers/character.controller.js';

/**
 * @type {Router}
 * @description Le routeur pour les routes liées aux personnages.
 */
const router = Router();

// CREATE
router.post(
  '/',
  /*  #swagger.tags = ['Character']
      #swagger.description = 'Endpoint pour créer un personnage.' */
  controllerWrapper(characterController.createCharacter),
);

// READ ALL
router.get(
  '/',
  /*  #swagger.tags = ['Character']
      #swagger.description = 'Endpoint pour récupérer tous les personnages.' */
  controllerWrapper(characterController.getAllCharacters),
);

// READ ONE
router.get(
  '/:id',
  /*  #swagger.tags = ['Character']
      #swagger.description = 'Endpoint pour récupérer un personnage.' */
  controllerWrapper(characterController.getCharacterById),
);

// UPDATE
router.patch(
  '/:id',
  /*  #swagger.tags = ['Character']
      #swagger.description = 'Endpoint pour mettre à jour un personnage.' */
  controllerWrapper(characterController.updateCharacter),
);

// DELETE
router.delete(
  '/:id',
  /*  #swagger.tags = ['Character']
      #swagger.description = 'Endpoint pour suprimer un personnage.' */
  controllerWrapper(characterController.deleteCharacter),
);

export default router;
