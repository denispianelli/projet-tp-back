import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import enemyController from '../controllers/enemy.controller.js';

/**
 * Le routeur pour les ennemis.
 * @type {Router}
 */
const router = Router();

// CREATE
router.post(
  '/',
  /*  #swagger.tags = ['Enemy']
      #swagger.description = 'Endpoint pour créer un ennemi.' */
  controllerWrapper(enemyController.createEnemy),
);

// READ ALL
router.get(
  '/',
  /*  #swagger.tags = ['Enemy']
      #swagger.description = 'Endpoint pour récupérer tous les ennemis.' */
  controllerWrapper(enemyController.getAllEnemies),
);

// READ ONE
router.get(
  '/:id',
  /*  #swagger.tags = ['Account']
      #swagger.description = 'Endpoint pour récupérer un ennemi.' */
  controllerWrapper(enemyController.getEnemyById),
);

// UPDATE
router.patch(
  '/:id',
  /*  #swagger.tags = ['Account']
      #swagger.description = 'Endpoint pour mettre à jour un ennemi.' */
  controllerWrapper(enemyController.updateEnemy),
);

// DELETE
router.delete(
  '/:id',
  /*  #swagger.tags = ['Account']
      #swagger.description = 'Endpoint pour supprimer un ennemi.' */
  controllerWrapper(enemyController.deleteEnemy),
);

export default router;
