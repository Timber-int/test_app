import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { IUser } from '../entity';

class UserMiddleware {
    public async checkIsUserEmailUnique(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userFromDB = await userService.getUserByEmail(req.body.email);

            if (userFromDB) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsUserExistByEmail(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userFromDB = await userService.getUserByEmail(req.body.email);

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserRole(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { userRoles } = req;

            const { role } = req.user as IUser;

            if (role) {
                if (!userRoles?.includes(role)) {
                    next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                    return;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
