import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { genderService, genreCategoryService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class GenderCategoryMiddleware {
    public async checkIsGenderCategoryByTitleExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderCategoryFromDB = await genreCategoryService.getGenderCategoryById(req.body.title);

            if (genderCategoryFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_CATEGORY_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsGenderCategoryByGenderExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
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
            console.log(genderFromDB);
            if (!genderFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsGenderCategoryByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const genderCategoryFromDB = await genreCategoryService.getGenderCategoryById(Number(id));

            if (!genderCategoryFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_CATEGORY_EXIST, STATUS.CODE_404));
                return;
            }

            req.genderCategory = genderCategoryFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const genderCategoryMiddleware = new GenderCategoryMiddleware();
