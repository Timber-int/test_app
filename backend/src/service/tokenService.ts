import jwt from 'jsonwebtoken';
import { DeleteResult } from 'typeorm';
import { config } from '../config';
import { TokenType } from '../constants';
import { IToken } from '../entity';
import { ITokenDataToSave, ITokenPair, IUserPayload } from '../interface';
import { tokenRepository } from '../repository';

class TokenService {
    public async generateTokenPair(payload: IUserPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: config.EXPIRES_IN_ACCESS });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: config.EXPIRES_IN_REFRESH });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveTokenToDB(tokenDataToSave: ITokenDataToSave): Promise<ITokenDataToSave> {
        const { accessToken, refreshToken, userId } = tokenDataToSave;

        const tokenFromDB = await tokenRepository.getTokenById(userId);

        if (tokenFromDB) {
            tokenFromDB.accessToken = accessToken;
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.saveTokeToDB(tokenFromDB);
        }

        return tokenRepository.saveTokeToDB(tokenDataToSave);
    }

    public async getTokenById(userId: number): Promise<IToken | undefined> {
        return tokenRepository.getTokenById(userId);
    }

    public async verifyToken(token: string, tokenType: string): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === TokenType.REFRESH) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(token, secretWord as string) as IUserPayload;
    }

    public async deleteToken(userId: number): Promise<DeleteResult> {
        return tokenRepository.deleteTokenById(userId);
    }
}

export const tokenService = new TokenService();
