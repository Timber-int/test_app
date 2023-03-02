import { NextFunction, Response, Router } from 'express';
import { productController } from '../controller';
import {
    dataValidatorMiddleware, fileMiddleware, genderCategoryMiddleware, productMiddleware,
} from '../middleware';
import { IRequestExtended } from '../interface';
import {
    createProductValidator,
    updateProductSetDiscountValidator,
    updateProductValidator,
} from '../validation';

const router = Router();

router.get('/gender/:genderId',
    productMiddleware.checkIsGenderExist,
    productMiddleware.checkIsGenderCategoryExist,
    productMiddleware.checkIsCategoryExist,
    productController.getAllProducts);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createProductValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    fileMiddleware.checkIsPhotoFileExist,
    productMiddleware.checkIsProductByTitleExist,
    genderCategoryMiddleware.checkIsGenderCategoryByGenderExist,
    productMiddleware.checkIsProductByGenderCategoryExist,
    productMiddleware.checkIsProductByCategoryExist,
    productMiddleware.checkIsProductGenderCategoryByGenderExist,
    productMiddleware.checkIsProductCategoryByGenderCategoryExist,
    productController.createProduct,
);
router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateProductValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    fileMiddleware.checkIsPhotoToUpdateFileExist,
    productMiddleware.checkIsProductByTitleExist,
    productMiddleware.checkIsProductHasDiscount,
    productController.updateProductById,
);
router.put('/setDiscount/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateProductSetDiscountValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    productMiddleware.checkIsProductByIdExist,
    productController.updateProductByIdSetDiscount,
);
router.delete('/:id', productMiddleware.checkIsProductByIdExist, productController.deleteProductById);

export const productRouter = router;
