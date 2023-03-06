import { NextFunction, Response } from 'express';
import { TokenType } from '../constants';
import { IRequestExtended } from '../interface';
import {
    authService, passwordService, tokenService, userService,
} from '../service';
import { IUser } from '../entity';

class AuthController {
    public async registration(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = await userService.createUser(req.body);

            const { accessToken, refreshToken } = await authService.registration(user);

            const userNormalized = await passwordService.userNormalization(user);

            res.cookie(TokenType.REFRESH_TOKEN, refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.cookie(TokenType.ACCESS_TOKEN, accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });

            next();
        } catch (e) {
            next(e);
        }
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = req.user as IUser;

            const { password: hashPassword, email, id } = user;

            const { password } = req.body;

            await userService.comparePassword(password, hashPassword);

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userEmail: email, userId: id });

            await tokenService.saveTokenToDB({ accessToken, refreshToken, userId: id });

            const userNormalized = await passwordService.userNormalization(user);

            res.cookie(TokenType.REFRESH_TOKEN, refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.cookie(TokenType.ACCESS_TOKEN, accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            // await emailService.sendMail(email, EmailActionEnum.LOGIN, {});

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });

            next();
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = req.user as IUser;

            await tokenService.deleteTokenById(user.id);

            res.clearCookie(TokenType.REFRESH_TOKEN);

            res.clearCookie(TokenType.ACCESS_TOKEN);

            const userNormalized = await passwordService.userNormalization(user);

            res.json({
                user: userNormalized,
            });

            next();
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = req.user as IUser;

            const { email, id } = user;

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userEmail: email, userId: id });

            await tokenService.saveTokenToDB({ accessToken, refreshToken, userId: id });

            res.cookie(TokenType.REFRESH_TOKEN, refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.cookie(TokenType.ACCESS_TOKEN, accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            const userNormalized = await passwordService.userNormalization(user);

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });

            next();
        } catch (e) {
            next(e);
        }
    }

    public async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = req.user as IUser;

            const { email, id } = user;

            const { actionToken } = await tokenService.generateActionToken({ userEmail: email, userId: id });

            await tokenService.saveActionTokenToDB({ actionToken, userId: id });

            res.cookie(TokenType.ACTION_TOKEN, actionToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            const userNormalized = await passwordService.userNormalization(user);

            res.json({
                actionToken,
                user: userNormalized,
            });

            next();
        } catch (e) {
            next(e);
        }
    }

    public async setNewPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = req.user as IUser;

            const { id } = user;

            await userService.updateUserById(id, req.body);

            await tokenService.deleteActionTokenById(id);

            res.clearCookie(TokenType.ACTION_TOKEN);

            const userNormalized = await passwordService.userNormalization(user);

            res.json({
                user: userNormalized,
            });

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
