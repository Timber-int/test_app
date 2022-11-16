import { ITokenPair } from '../interface';
import { IUser } from '../entity';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(user: IUser): Promise<ITokenPair> {
        return this._getTokenPair(user);
    }

    private async _getTokenPair(user: IUser): Promise<ITokenPair> {
        const { id, email } = user;

        const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userEmail: email, userId: id });

        await tokenService.saveTokenToDB({ accessToken, refreshToken, userId: id });

        return {
            accessToken,
            refreshToken,
        };
    }
}

export const authService = new AuthService();
