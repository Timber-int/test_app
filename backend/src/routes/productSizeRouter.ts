import { NextFunction, Response, Router } from 'express';
import { productSizeController } from '../controller';
import { dataValidatorMiddleware, productInformationMiddleware, productSizeMiddleware } from '../middleware';
import { IRequestExtended } from '../interface';
import { createProductSizeValidator } from '../validation';

const router = Router();

router.get('/:id', productInformationMiddleware.checkIsProductExist, productSizeController.getAllProductSizes);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createProductSizeValidator;
    next();
}, dataValidatorMiddleware.dataValidator, productInformationMiddleware.checkIsProductInformationByProductExist, productSizeMiddleware.checkIsProductSizeLimit, productSizeController.createProductSize);
router.delete('/:id', productSizeMiddleware.checkIsProductSizeByIdExist, productSizeController.deleteProductSizeById);

export const productSizeRouter = router;
