import { Router } from 'express';
import controllerWrapper from '../helpers/controller.wrapper.js';
import characterController from '../controllers/character.controller.js';

const router = Router();

router.get('/', controllerWrapper(characterController.getAllCharacters));

export default router;
