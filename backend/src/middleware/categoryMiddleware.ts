import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { categoryService, genderService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class CategoryMiddleware {
    public async checkIsCategoryByTitleExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const categoryFromDB = await categoryService.getCategoryByTitle(req.body.title);

            if (categoryFromDB) {
                next(new ErrorHandler(MESSAGE.CATEGORY_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCategoryByGenderExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderFromDB = await genderService.getGenderById(Number(req.body.genderId));

            if (!genderFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsGenderExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderFromDB = await genderService.getGenderById(Number(req.params.id));

            if (!genderFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCategoryByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const categoryFromDB = await categoryService.getCategoryById(Number(id));

            if (!categoryFromDB) {
                next(new ErrorHandler(MESSAGE.CATEGORY_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.category = categoryFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const categoryMiddleware = new CategoryMiddleware();
