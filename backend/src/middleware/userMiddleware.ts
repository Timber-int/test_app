import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class UserMiddleware {
    public async checkIsUserExistsOnDB(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userWithEmail = await userService.getUserByEmail(req.body.email);

            if (userWithEmail) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsUserExistsByIdOnDB(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userFromDB = await userService.getUserById(Number(req.params.id));

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.USER_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsUserByEmailExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userWithEmail = await userService.getUserByEmail(req.body.email);

            if (!userWithEmail) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404));
                return;
            }

            req.user = userWithEmail;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
