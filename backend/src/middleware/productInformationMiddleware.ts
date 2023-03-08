import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { productInformationService, productService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class ProductInformationMiddleware {
    public async checkIsProductInformationByProductExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productFromDB = await productService.getProductById(Number(req.body.productId));

            if (!productFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.product = productFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsProductInformationByProductIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productInformationFromDB = await productInformationService.getProductInformationByProductId(Number(req.body.productId));

            if (productInformationFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_INFORMATION_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsProductExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productFromDB = await productService.getProductById(Number(req.params.id));

            if (!productFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsProductInformationByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productInformationFromDB = await productInformationService.getProductInformationById(Number(id));

            if (!productInformationFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_INFORMATION_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.productInformation = productInformationFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const productInformationMiddleware = new ProductInformationMiddleware();
