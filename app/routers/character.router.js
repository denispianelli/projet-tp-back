import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import characterController from '../controllers/character.controller.js';

/**
 * @type {Router}
 * @description Le routeur pour les routes liées aux personnages.
 */
const router = Router();

// CREATE
router.post('/', controllerWrapper(characterController.createCharacter));

// READ ALL
router.get('/', controllerWrapper(characterController.getAllCharacters));

// READ ONE
router.get('/:id', controllerWrapper(characterController.getCharacterById));

// UPDATE
router.patch('/:id', controllerWrapper(characterController.updateCharacter));

// DELETE
router.delete('/:id', controllerWrapper(characterController.deleteCharacter));

export default router;
