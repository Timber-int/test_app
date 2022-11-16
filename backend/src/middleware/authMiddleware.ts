import { NextFunction, Response } from 'express';
import { STATUS } from '../errorCode';
import { ErrorHandler } from '../errorHandler';
import { IRequestExtended } from '../interface';
import { MESSAGE } from '../message';
import { tokenService, userService } from '../service';
import { TokenType } from '../constants';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_404));
                return;
            }

            const accessToken = authorizationHeader.split(' ')[1];

            const { userEmail, userId } = await tokenService.verifyToken(accessToken, TokenType.ACCESS);

            const tokenPairFromDB = await tokenService.getTokenById(userId);

            if (!tokenPairFromDB) {
                next(new ErrorHandler(MESSAGE.TOKEN_NOT_VALID, STATUS.CODE_401));
                return;
            }

            const userFromDB = await userService.getUserByEmail(userEmail);

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.USER_NOT_EXIST, STATUS.CODE_404));
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
                next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_404));
                return;
            }

            const refreshToken = authorizationHeader.split(' ')[2];

            const { userEmail, userId } = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);

            const tokenPairFromDB = await tokenService.getTokenById(userId);

            if (!tokenPairFromDB) {
                next(new ErrorHandler(MESSAGE.TOKEN_NOT_VALID, STATUS.CODE_401));
                return;
            }

            await tokenService.deleteToken(userId);

            const userFromDB = await userService.getUserByEmail(userEmail);

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.USER_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
