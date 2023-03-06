import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { productSizeService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { IProduct } from '../entity';

class ProductSizeMiddleware {
    public async checkIsProductSizeByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productSizeFromDB = await productSizeService.getProductSizeById(Number(id));

            if (!productSizeFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_SIZE_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.productSize = productSizeFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsProductSizeLimit(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.product as IProduct;

            const productSizesFromDB = await productSizeService.getAllProductSizesByProductId(Number(id));

            if (productSizesFromDB.length > 10) {
                next(new ErrorHandler(MESSAGE.PRODUCT_SIZE_LIMIT, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsProductSizesByProductIdAndSize(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.product as IProduct;

            const productSizesFromDB = await productSizeService.getAllProductSizesByProductIdAndSize(Number(id), Number(req.body.productSize));

            if (productSizesFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_SIZE_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const productSizeMiddleware = new ProductSizeMiddleware();
