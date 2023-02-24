import { NextFunction, Response, Router } from 'express';
import { productPhotoController } from '../controller';
import {
    dataValidatorMiddleware,
    fileMiddleware,
    productInformationMiddleware,
    productPhotoMiddleware,
} from '../middleware';
import { IRequestExtended } from '../interface';
import { createProductPhotoValidator } from '../validation';

const router = Router();

router.get('/:id', productInformationMiddleware.checkIsProductExist, productPhotoController.getAllProductPhotos);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createProductPhotoValidator;
    next();
}, dataValidatorMiddleware.dataValidator, fileMiddleware.checkIsPhotoFileExist, productInformationMiddleware.checkIsProductInformationByProductExist, productPhotoMiddleware.checkIsProductPhotoLimit, productPhotoController.createProductPhoto);
router.delete('/:id', productPhotoMiddleware.checkIsProductPhotoByIdExist, productPhotoController.deleteProductPhotoById);

export const productPhotoRouter = router;
