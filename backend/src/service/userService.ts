import bcrypt from 'bcrypt';
import { CONSTANTS } from '../constants';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { IUser } from '../entity';
import { userRepository } from '../repository';

class UserService {
    public async getUserById(id: number): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async createUser(data: IUser): Promise<IUser> {
        const { password } = data;

        const hashedPassword = await this._hashPassword(password);

        const userWithHashPassword = { ...data, password: hashedPassword };

        return userRepository.createUser(userWithHashPassword);
    }

    public async comparePassword(password: string, hashPassword: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hashPassword);

        if (!isPasswordUnique) {
            throw new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD);
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, CONSTANTS.HASH_SALT);
    }
}

export const userService = new UserService();
