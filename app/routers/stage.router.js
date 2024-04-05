import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import stageController from '../controllers/stage.controller.js';

const router = Router();

// CREATE
router.post('/', controllerWrapper(stageController.createStage));

// READ ALL
router.get('/', controllerWrapper(stageController.getAllStages));

// READ ONE
router.get('/:id', controllerWrapper(stageController.getStageById));

// UPDATE
router.patch('/:id', controllerWrapper(stageController.updateStage));

// DELETE
router.delete('/:id', controllerWrapper(stageController.deleteStage));

export default router;
