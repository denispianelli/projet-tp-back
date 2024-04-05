import { Router } from 'express';
import userRouter from './user.router.js';
import characterRouter from './character.router.js';
import stageRouter from './stage.router.js';
import accountRouter from './account.router.js';
import weaponRouter from './weapon.router.js';
import enemyRouter from './enemy.router.js';
import contactRouter from './contact.router.js';

const router = Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);
router.use('/characters', characterRouter);
router.use('/stages', stageRouter);
router.use('/weapons', weaponRouter);
router.use('/enemies', enemyRouter);
router.use('/contact', contactRouter);

export default router;
