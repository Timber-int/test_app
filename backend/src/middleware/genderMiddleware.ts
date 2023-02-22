import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { genderService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class GenderMiddleware {
    public async checkIsGenderByTitleExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderFromDB = await genderService.getGenderByTitle(req.body.title);

            if (genderFromDB) {
                next(new ErrorHandler(MESSAGE.GENDER_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsGenderByIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const genderFromDB = await genderService.getGenderById(Number(id));

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
}

export const genderMiddleware = new GenderMiddleware();
