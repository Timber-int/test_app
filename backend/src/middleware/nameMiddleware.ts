import { NextFunction, Response } from 'express';
import { STATUS } from '../errorCode';
import { ErrorHandler } from '../errorHandler';
import { IRequestExtended } from '../interface';
import { MESSAGE } from '../message';
import { nameService } from '../service';

class NameMiddleware {
    public async checkIsNameExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const nameFromDB = await nameService.getNameById(Number(req.params.id));

            if (!nameFromDB) {
                next(new ErrorHandler(MESSAGE.NAME_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsNameRankNotExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const nameFromDB = await nameService.getNameById(Number(req.body.id));

            if (nameFromDB) {
                next(new ErrorHandler(MESSAGE.RANK_IS_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const nameMiddleware = new NameMiddleware();
