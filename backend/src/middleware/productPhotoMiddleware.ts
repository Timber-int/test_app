import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { productPhotoService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { IProduct } from '../entity';

class ProductPhotoMiddleware {
    public async checkIsProductPhotoByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productPhotoFromDB = await productPhotoService.getProductPhotoById(Number(id));

            if (!productPhotoFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_PHOTO_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.productPhoto = productPhotoFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsProductPhotoLimit(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.product as IProduct;

            const productPhotosFromDB = await productPhotoService.getAllProductPhotosByProductId(Number(id));

            if (productPhotosFromDB.length > 4) {
                next(new ErrorHandler(MESSAGE.PRODUCT_PHOTOS_LIMIT, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const productPhotoMiddleware = new ProductPhotoMiddleware();
