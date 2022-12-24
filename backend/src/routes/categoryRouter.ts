import { NextFunction, Router, Response } from 'express';
import { categoryController } from '../controller';
import { IRequestExtended } from '../interface';
import { categoryMiddleware, dataValidatorMiddleware, fileMiddleware } from '../middleware';
import { categoryBodyValidateForCreate, categoryBodyValidateForUpdate } from '../validation';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = categoryBodyValidateForCreate;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    fileMiddleware.checkIsPhotoFileExist,
    categoryMiddleware.checkIsCategoryNameUnique,
    categoryController.createCategory);
router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = categoryBodyValidateForUpdate;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    fileMiddleware.checkIsPhotoToUpdateFileExist,
    categoryMiddleware.checkIsCategoryNameUnique,
    categoryMiddleware.checkIsCategoryExistsOnDB,
    categoryController.updateCategoryById);
router.delete('/:id', categoryMiddleware.checkIsCategoryExistsOnDB, categoryController.deleteCategoryById);

export const categoryRouter = router;
