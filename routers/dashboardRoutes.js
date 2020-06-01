

import { Router } from 'express';
import userController from '../controller/userController';

const router = Router();

router.get('/dashboard/:uid', userController.dashboard);
export default router;