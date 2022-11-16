import { Router } from 'express';
import { userController } from '../controller';
import { userMiddleware } from '../middleware';

const router = Router();

router.get('/:id', userMiddleware.checkIsUserExistsByIdOnDB, userController.getUserById);

export const userRouter = router;
