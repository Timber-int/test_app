import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { TokenType, UserRole } from '../constants';
import { IUser } from '../entity';
import { config } from '../config';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { tokenService, userService } from '../service';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            const accessToken = authorizationHeader.split(' ')[1];

            const { userId } = await tokenService.verifyToken(accessToken, TokenType.ACCESS_TOKEN);

            const tokenFromDB = await tokenService.getTokenByUserId(userId);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            const userFromDB = await userService.getUserById(userId);

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            const refreshToken = authorizationHeader.split(' ')[2];

            const { userId } = await tokenService.verifyToken(refreshToken, TokenType.REFRESH_TOKEN);

            const tokenFromDB = await tokenService.getTokenByUserId(userId);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            await tokenService.deleteTokenById(userId);

            const userFromDB = await userService.getUserById(userId);

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            const actionToken = authorizationHeader.split(' ')[3];

            const { userId } = await tokenService.verifyToken(actionToken, TokenType.ACTION_TOKEN);

            const tokenFromDB = await tokenService.getActionTokenByUserId(userId);

            if (!tokenFromDB) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            const userFromDB = await userService.getUserById(userId);

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async setRole(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { password, email } = req.body as IUser;
            if (password === config.SECRET_ADMIN_PASSWORD && email === config.SECRET_ADMIN_EMAIL) {
                req.body.role = UserRole.ADMIN;
            }

            if (password === config.SECRET_MANAGER_PASSWORD && email === config.SECRET_MANAGER_EMAIL) {
                req.body.role = UserRole.MANAGER;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
