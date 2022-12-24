import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { categoryService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class CategoryMiddleware {
    public async checkIsCategoryExistsOnDB(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const category = await categoryService.getCategoryById(Number(req.params.id));

            if (!category) {
                next(new ErrorHandler(MESSAGE.CATEGORY_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCategoryNameUnique(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const category = await categoryService.getCategoryByName(req.body.name);

            if (category) {
                next(new ErrorHandler(MESSAGE.CATEGORY_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const categoryMiddleware = new CategoryMiddleware();
