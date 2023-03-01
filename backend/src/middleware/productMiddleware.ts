import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import {
    categoryService, genderCategoryService, genderService, productService,
} from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { ICategory, IGender, IGenderCategory } from '../entity';

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

    public async checkIsGenderExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderFromDB = await genderService.getGenderById(Number(req.params.genderId));

            if (!genderFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.gender = genderFromDB;

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

            req.genderCategory = genderCategoryFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCategoryExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderCategoryFromDB = req.genderCategory as IGenderCategory;

            if (req.query.categoryId && genderCategoryFromDB && genderCategoryFromDB.category) {
                const isCategoryByGenderCategory = genderCategoryFromDB.category.find((category: ICategory) => category.id === Number(req.query.categoryId));

                if (!isCategoryByGenderCategory) {
                    next(new ErrorHandler(MESSAGE.GENDER_CATEGORY_NOT_INCLUDE_CATEGORY, STATUS.CODE_404));
                    return;
                }

                const categoryFromDB = await categoryService.getCategoryById(Number(req.query.categoryId));

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

    public async checkIsProductCategoryByGenderCategoryExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderCategoryFromDB = req.genderCategory as IGenderCategory;

            if (genderCategoryFromDB.category) {
                const isCategoryByGenderCategory = genderCategoryFromDB.category.find((category: ICategory) => category.id === Number(req.body.categoryId));

                if (!isCategoryByGenderCategory) {
                    next(new ErrorHandler(MESSAGE.GENDER_CATEGORY_NOT_INCLUDE_CATEGORY, STATUS.CODE_404));
                    return;
                }
                next();
            }
        } catch (e) {
            next(e);
        }
    }

    public async checkIsProductGenderCategoryByGenderExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderFromDB = req.gender as IGender;

            if (genderFromDB.genderCategory) {
                const isGenderCategoryByGender = genderFromDB.genderCategory.find((genderCategory: IGenderCategory) => genderCategory.id === Number(req.body.genderCategoryId));

                if (!isGenderCategoryByGender) {
                    next(new ErrorHandler(MESSAGE.GENDER_NOT_INCLUDE_GENDER_CATEGORY, STATUS.CODE_404));
                    return;
                }
                next();
            }
        } catch (e) {
            next(e);
        }
    }

    public async checkIsGenderCategoryExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderFromDB = req.gender as IGender;

            if (req.query.genderCategoryId && genderFromDB.genderCategory) {
                const isGenderCategoryByGender = genderFromDB.genderCategory.find((genderCategory: IGenderCategory) => genderCategory.id === Number(req.query.genderCategoryId));

                if (!isGenderCategoryByGender) {
                    next(new ErrorHandler(MESSAGE.GENDER_NOT_INCLUDE_GENDER_CATEGORY, STATUS.CODE_404));
                    return;
                }

                const genderCategoryFromDB = await genderCategoryService.getGenderCategoryById(Number(req.query.genderCategoryId));

                if (!genderCategoryFromDB) {
                    next(new ErrorHandler(MESSAGE.GENDER_CATEGORY_NOT_EXIST, STATUS.CODE_404));
                    return;
                }

                req.genderCategory = genderCategoryFromDB;

                next();
            } else {
                next();
            }
        } catch (e) {
            next(e);
        }
    }
}

export const productMiddleware = new ProductMiddleware();
