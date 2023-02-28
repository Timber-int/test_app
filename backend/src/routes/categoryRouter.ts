import { NextFunction, Response, Router } from 'express';
import { categoryController } from '../controller';
import { IRequestExtended } from '../interface';
import { categoryMiddleware, dataValidatorMiddleware } from '../middleware';
import { createCategoryValidator, updateCategoryValidator } from '../validation';

const router = Router();

router.get('/',
    // categoryMiddleware.checkIsGenderCategoryExist,
    categoryController.getAllCategories);
// router.get('/:id', categoryController.getCategoryById);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createCategoryValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    categoryMiddleware.checkIsCategoryByTitleExist,
    categoryMiddleware.checkIsCategoryByGenderCategoryExist,
    categoryController.createCategory,
);

router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateCategoryValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    categoryMiddleware.checkIsCategoryByIdExist,
    categoryMiddleware.checkIsCategoryByTitleExist,
    categoryController.updateCategoryById,
);

router.delete('/:id',
    categoryMiddleware.checkIsCategoryByIdExist,
    categoryController.deleteCategoryById,
);

export const categoryRouter = router;
