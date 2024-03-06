import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import characterController from '../controllers/character.controller.js';

const router = Router();

router.get('/', controllerWrapper(characterController.getAllCharacters));

export default router;
