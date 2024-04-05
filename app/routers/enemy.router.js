import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import enemyController from '../controllers/enemy.controller.js';

const router = Router();

// CREATE
router.post('/', controllerWrapper(enemyController.createEnemy));

// READ ALL
router.get('/', controllerWrapper(enemyController.getAllEnemies));

// READ ONE
router.get('/:id', controllerWrapper(enemyController.getEnemyById));

// UPDATE
router.patch('/:id', controllerWrapper(enemyController.updateEnemy));

// DELETE
router.delete('/:id', controllerWrapper(enemyController.deleteEnemy));

export default router;
