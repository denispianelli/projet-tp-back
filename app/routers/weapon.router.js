import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import weaponController from '../controllers/weapon.controller.js';

const router = Router();

// CREATE
router.post('/', controllerWrapper(weaponController.createWeapon));

// READ ALL
router.get('/', controllerWrapper(weaponController.getAllWeapons));

// READ ONE
router.get('/:id', controllerWrapper(weaponController.getWeaponById));

// UPDATE
router.patch('/:id', controllerWrapper(weaponController.updateWeapon));

// DELETE
router.delete('/:id', controllerWrapper(weaponController.deleteWeapon));

export default router;
