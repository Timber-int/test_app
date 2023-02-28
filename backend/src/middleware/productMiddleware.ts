import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { categoryService, genderCategoryService, productService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { ICategory, IGenderCategory } from '../entity';

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

    public async checkIsProductByGenderCategoryExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderCategoryFromDB = await genderCategoryService.getGenderCategoryById(Number(req.body.genderCategoryId));

            if (!genderCategoryFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_CATEGORY_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCategoryExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderCategoryFromDB = req.genderCategory as IGenderCategory;

            if (req.query.id && genderCategoryFromDB.category) {
                const isCategoryByGenderCategory = genderCategoryFromDB.category.find((category: ICategory) => category.id === Number(req.query.id));

                if (!isCategoryByGenderCategory) {
                    next(new ErrorHandler(MESSAGE.GENDER_CATEGORY_NOT_INCLUDE_CATEGORY, STATUS.CODE_404));
                    return;
                }
                next();

                const categoryFromDB = await categoryService.getCategoryById(Number(req.query.id));

                if (!categoryFromDB) {
                    next(new ErrorHandler(MESSAGE.CATEGORY_NOT_EXIST, STATUS.CODE_404));
                    return;
                }
                next();
            } else {
                next();
            }
        } catch (e) {
            next(e);
        }
    }

    public async checkIsGenderCategoryExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderCategoryFromDB = await genderCategoryService.getGenderCategoryById(Number(req.params.genderCategoryId));

            if (!genderCategoryFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_CATEGORY_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.genderCategory = genderCategoryFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const productMiddleware = new ProductMiddleware();
