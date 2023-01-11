import jwt from 'jsonwebtoken';
import { DeleteResult } from 'typeorm';
import {
    IActionTokenDataToSave,
    IActionTokenSingle, ITokenDataToSave, ITokenPair, IUserPayload,
} from '../interface';
import { config } from '../config';
import { IActionToken, IToken } from '../entity';
import { actionTokenRepository, tokenRepository } from '../repository';
import { TokenType } from '../constants';

class TokenService {
    public async generateTokenPair(userPayload: IUserPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(userPayload, config.SECRET_ACCESS_KEY, { expiresIn: config.EXPIRES_IN_ACCESS });
        const refreshToken = jwt.sign(userPayload, config.SECRET_REFRESH_KEY, { expiresIn: config.EXPIRES_IN_REFRESH });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async generateActionToken(userPayload: IUserPayload): Promise<IActionTokenSingle> {
        const actionToken = jwt.sign(userPayload, config.SECRET_ACTION_KEY, { expiresIn: config.EXPIRES_IN_ACTION });

        return { actionToken };
    }

    public async saveTokenToDB(tokenDataToSave: ITokenDataToSave): Promise<IToken> {
        const { accessToken, refreshToken, userId } = tokenDataToSave;

        const tokenFromDB = await tokenRepository.getTokenByUserId(userId);

        if (tokenFromDB) {
            tokenFromDB.accessToken = accessToken;
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.saveTokeToDB(tokenFromDB);
        }

        return tokenRepository.saveTokeToDB(tokenDataToSave);
    }

    public async saveActionTokenToDB(actionTokenDataToSave: IActionTokenDataToSave): Promise<IActionToken> {
        const { actionToken, userId } = actionTokenDataToSave;

        const actionTokenFromDB = await actionTokenRepository.getActionTokenByUserId(userId);

        if (actionTokenFromDB) {
            actionTokenFromDB.actionToken = actionToken;
            return actionTokenRepository.saveActionTokeToDB(actionTokenFromDB);
        }

        return actionTokenRepository.saveActionTokeToDB(actionTokenDataToSave);
    }

    public async getTokenByUserId(userId: number): Promise<IToken | undefined> {
        return tokenRepository.getTokenByUserId(userId);
    }

    public async deleteTokenById(id: number): Promise<DeleteResult> {
        return tokenRepository.deleteTokenById(id);
    }

    public async getActionTokenByUserId(userId: number): Promise<IActionToken | undefined> {
        return actionTokenRepository.getActionTokenByUserId(userId);
    }

    public async deleteActionTokenById(id: number): Promise<DeleteResult> {
        return actionTokenRepository.deleteActionTokenById(id);
    }

    public async verifyToken(token: string, tokenType: string): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === TokenType.REFRESH_TOKEN) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        if (tokenType === TokenType.ACTION_TOKEN) {
            secretWord = config.SECRET_ACTION_KEY;
        }

        return jwt.verify(token, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
