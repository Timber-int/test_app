import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { categoryService, dishService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class DishMiddleware {
    public async checkIsDishExistsOnDB(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const dish = await dishService.getDishById(Number(req.params.id));

            if (!dish) {
                next(new ErrorHandler(MESSAGE.DISH_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsDishHasCategory(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const category = await categoryService.getCategoryById(Number(req.body.categoryId));

            if (!category) {
                next(new ErrorHandler(MESSAGE.CATEGORY_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsDishNameUnique(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const dish = await dishService.getDishByName(req.body.name);

            if (dish) {
                next(new ErrorHandler(MESSAGE.DISH_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const dishMiddleware = new DishMiddleware();
