import { NextFunction, Response, Router } from 'express';
import { genderCategoryController } from '../controller';
import { IRequestExtended } from '../interface';
import { dataValidatorMiddleware, genderCategoryMiddleware } from '../middleware';
import { createGenderCategoryValidator } from '../validation';

const router = Router();

router.get('/:id',
    genderCategoryMiddleware.checkIsGenderExist,
    genderCategoryController.getAllGenderCategory);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createGenderCategoryValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    genderCategoryMiddleware.checkIsGenderCategoryByTitleExist,
    genderCategoryMiddleware.checkIsGenderCategoryByGenderExist,
    genderCategoryController.createGenderCategory,
);

router.delete('/:id',
    genderCategoryMiddleware.checkIsGenderCategoryByIdExist,
    genderCategoryController.deleteGenderCategoryById,
);

export const genderCategoryRouter = router;
