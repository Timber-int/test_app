import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';
import { IUser } from '../entity';
import { userRepository } from '../repository';
import { CONSTANTS } from '../constants';
import { MESSAGE } from '../message';
import { ErrorHandler } from '../errorHandler';

class UserService {
    public async getAllUsers(): Promise<IUser[]> {
        return userRepository.getAllUsers();
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async updateUserById(id: number, data: Partial<IUser>): Promise<UpdateResult> {
        const { password } = data;

        if (password) {
            data.password = await this._hashPassword(password);
        }

        return userRepository.updateUserById(id, data);
    }

    public async createUser(data: IUser): Promise<IUser> {
        const { password } = data;

        const hashPassword = await this._hashPassword(password);

        const userWithHashPassword = { ...data, password: hashPassword };

        return userRepository.createUser(userWithHashPassword);
    }

    public async comparePassword(password: string, hashPassword:string): Promise<void | Error> {
        const isPasswordCompare = await bcrypt.compare(password, hashPassword);

        if (!isPasswordCompare) {
            throw new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD);
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, CONSTANTS.HASH_SALT);
    }
}

export const userService = new UserService();
