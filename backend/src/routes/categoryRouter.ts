import { NextFunction, Response, Router } from 'express';
import { categoryController } from '../controller';
import { IRequestExtended } from '../interface';
import { categoryMiddleware, dataValidatorMiddleware, fileMiddleware } from '../middleware';
import { createCategoryValidator, updateCategoryValidator } from '../validation';

const router = Router();

router.get('/:id', categoryMiddleware.checkIsGenderExist, categoryController.getAllCategories);
// router.get('/:id', categoryController.getCategoryById);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createCategoryValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    categoryMiddleware.checkIsCategoryByTitleExist,
    categoryMiddleware.checkIsCategoryByGenderExist,
    fileMiddleware.checkIsPhotoFileExist,
    categoryController.createCategory,
);

router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateCategoryValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    categoryMiddleware.checkIsCategoryByIdExist,
    fileMiddleware.checkIsPhotoToUpdateFileExist,
    categoryMiddleware.checkIsCategoryByTitleExist,
    categoryController.updateCategoryById,
);

router.delete('/:id',
    categoryMiddleware.checkIsCategoryByIdExist,
    categoryController.deleteCategoryById,
);

export const categoryRouter = router;
