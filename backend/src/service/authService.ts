import { IUser } from '../entity';
import { ITokenPair } from '../interface';
import { tokenService } from './tokenService';

class AuthService {
    public async registration(user: IUser): Promise<ITokenPair> {
        return this._getTokenPair(user);
    }

    private async _getTokenPair(user: IUser): Promise<ITokenPair> {
        const { email, id } = user as IUser;

        const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

        await tokenService.saveTokenToDB({ accessToken, refreshToken, userId: id });

        return { accessToken, refreshToken };
    }
}

export const authService = new AuthService();
