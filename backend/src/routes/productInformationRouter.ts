import { NextFunction, Response, Router } from 'express';
import { categoryController, productInformationController } from '../controller';
import { IRequestExtended } from '../interface';
import { dataValidatorMiddleware, productInformationMiddleware } from '../middleware';
import { createProductInformationValidator, updateProductInformationValidator } from '../validation';

const router = Router();

router.get('/:id', productInformationMiddleware.checkIsProductExist, productInformationController.getProductInformation);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createProductInformationValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    productInformationMiddleware.checkIsProductInformationByProductExist,
    productInformationController.createProductInformation,
);

router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateProductInformationValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    productInformationMiddleware.checkIsProductInformationByIdExist,
    categoryController.updateCategoryById,
);

router.delete('/:id',
    productInformationMiddleware.checkIsProductInformationByIdExist,
    productInformationController.deleteProductInformationById,
);

export const productInformationRouter = router;
