import { NextFunction, Router, Response } from 'express';
import { dishVideoController } from '../controller';
import { IRequestExtended } from '../interface';
import {
    authMiddleware, dataValidatorMiddleware, dishVideoMiddleware, fileMiddleware,
} from '../middleware';
import { dishVideoValidateForCreate } from '../validation';

const router = Router();

router.get('/', dishVideoController.getAllVideos);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = dishVideoValidateForCreate;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    authMiddleware.checkIsUserHasLawAdministrator,
    dishVideoMiddleware.checkIsVideoHaveDishId,
    fileMiddleware.checkIsVideoFileExist,
    dishVideoController.createDishVideo);
router.delete('/:id', authMiddleware.checkIsUserHasLawAdministrator, dishVideoMiddleware.checkIsVideoExistById, dishVideoController.deleteVideoById);

export const dishVideoRouter = router;
