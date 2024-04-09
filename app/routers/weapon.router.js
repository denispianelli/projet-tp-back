import { Router } from 'express';
import controllerWrapper from '../services/controller-wrapper.service.js';
import weaponController from '../controllers/weapon.controller.js';

/**
 * Router pour les armes.
 * @type {Router}
 */
const router = Router();

// CREATE
router.post(
  '/',
  /*  #swagger.tags = ['Weapon']
      #swagger.description = 'Endpoint pour créer une arme.' */
  controllerWrapper(weaponController.createWeapon),
);

// READ ALL
router.get(
  '/',
  /*  #swagger.tags = ['Weapon']
      #swagger.description = 'Endpoint pour récupérer toutes les armes.' */
  controllerWrapper(weaponController.getAllWeapons),
);

// READ ONE
router.get(
  '/:id',
  /*  #swagger.tags = ['Weapon']
      #swagger.description = 'Endpoint pour récupérer une arme.' */
  controllerWrapper(weaponController.getWeaponById),
);

// UPDATE
router.patch(
  '/:id',
  /*  #swagger.tags = ['Weapon']
      #swagger.description = 'Endpoint pour mettre à jour une arme.' */
  controllerWrapper(weaponController.updateWeapon),
);

// DELETE
router.delete(
  '/:id',
  /*  #swagger.tags = ['Weapon']
      #swagger.description = 'Endpoint pour supprimer une arme.' */
  controllerWrapper(weaponController.deleteWeapon),
);

export default router;
