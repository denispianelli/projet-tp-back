import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import stageController from '../controllers/stage.controller.js';

/**
 * @type {Router}
 * @description Le routeur pour les routes de stage.
 */
const router = Router();

// CREATE
router.post(
  '/',
  /*  #swagger.tags = ['Stage']
      #swagger.description = 'Endpoint pour créer un niveau.' */
  controllerWrapper(stageController.createStage),
);

// READ ALL
router.get(
  '/',
  /*  #swagger.tags = ['Stage']
      #swagger.description = 'Endpoint pour récupérer tous les niveaux.' */
  controllerWrapper(stageController.getAllStages),
);

// READ ONE
router.get(
  '/:id',
  /*  #swagger.tags = ['Stage']
      #swagger.description = 'Endpoint pour récupérer un niveau.' */
  controllerWrapper(stageController.getStageById),
);

// UPDATE
router.patch(
  '/:id',
  /*  #swagger.tags = ['Stage']
      #swagger.description = 'Endpoint pour mettre à jour un niveau.' */
  controllerWrapper(stageController.updateStage),
);

// DELETE
router.delete(
  '/:id',
  /*  #swagger.tags = ['Stage']
      #swagger.description = 'Endpoint pour supprimer un niveau.' */
  controllerWrapper(stageController.deleteStage),
);

export default router;
