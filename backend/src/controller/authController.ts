import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import {
    authService, passwordService, tokenService, userService,
} from '../service';
import { IUser } from '../entity';
import { MESSAGE } from '../message';

class AuthController {
    public async registration(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = await userService.createUser(req.body);

            const { accessToken, refreshToken } = await authService.registration(user);

            const userNormalized = await passwordService.userNormalization(user);

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });
        } catch (e) {
            next(e);
        }
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { password: hashPassword, email, id } = req.user as IUser;

            const { password } = req.body;

            await userService.comparePassword(password, hashPassword);

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenService.saveTokenToDB({ accessToken, refreshToken, userId: id });

            const userNormalized = await passwordService.userNormalization(req.user);

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                id,
                firstName,
                lastName,
            } = req.user as IUser;

            await tokenService.deleteToken(id);

            res.json(`${MESSAGE.LOGOUT_USER} ${firstName} ${lastName}`);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { email, id } = req.user as IUser;

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userEmail: email, userId: id });

            await tokenService.saveTokenToDB({ accessToken, refreshToken, userId: id });

            const userNormalized = await passwordService.userNormalization(req.user);

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
