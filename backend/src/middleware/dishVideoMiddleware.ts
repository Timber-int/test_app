import { NextFunction, Response } from 'express';
import { STATUS } from '../errorCode';
import { ErrorHandler } from '../errorHandler';
import { IRequestExtended } from '../interface';
import { MESSAGE } from '../message';
import { dishService, dishVideoService } from '../service';

class DishVideoMiddleware {
    public async checkIsVideoExistById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const videoFromDB = await dishVideoService.getVideoById(Number(req.params.id));

            if (!videoFromDB) {
                next(new ErrorHandler(MESSAGE.VIDEO_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.video = videoFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsVideoHaveDishId(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const dishFromDB = await dishService.getDishById(Number(req.body.dishId));

            if (!dishFromDB) {
                next(new ErrorHandler(MESSAGE.DISH_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.dish = dishFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const dishVideoMiddleware = new DishVideoMiddleware();
