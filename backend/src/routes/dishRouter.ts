import { NextFunction, Response, Router } from 'express';
import { dishController } from '../controller';
import {
    categoryMiddleware, dataValidatorMiddleware, dishMiddleware, fileMiddleware,
} from '../middleware';
import { IRequestExtended } from '../interface';
import { dishBodyValidateForCreate, dishBodyValidateForUpdate } from '../validation';

const router = Router();

router.get('/category/:id', categoryMiddleware.checkIsCategoryExistsOnDB, dishController.getAllCategories);

router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = dishBodyValidateForCreate;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    fileMiddleware.checkIsPhotoFileExist,
    dishMiddleware.checkIsDishNameUnique,
    dishMiddleware.checkIsDishHasCategory,
    dishController.createDish);

router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = dishBodyValidateForUpdate;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    fileMiddleware.checkIsPhotoToUpdateFileExist,
    dishMiddleware.checkIsDishNameUnique,
    dishMiddleware.checkIsDishExistsOnDB,
    dishMiddleware.checkIsDishHasCategory,
    dishController.updateDishById);

router.delete('/:id', dishMiddleware.checkIsDishExistsOnDB, dishController.deleteDishById);

export const dishRouter = router;
