import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { categoryService, productService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class ProductMiddleware {
    public async checkIsProductByTitleExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productFromDB = await productService.getProductByTitle(req.body.title);

            if (productFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsProductByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const productFromDB = await productService.getProductById(Number(id));

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

    public async checkIsProductByCategoryExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const categoryFromDB = await categoryService.getCategoryById(Number(req.body.categoryId));

            if (!categoryFromDB) {
                next(new ErrorHandler(MESSAGE.CATEGORY_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCategoryExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const categoryFromDB = await categoryService.getCategoryById(Number(req.params.id));

            if (!categoryFromDB) {
                next(new ErrorHandler(MESSAGE.CATEGORY_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const productMiddleware = new ProductMiddleware();
