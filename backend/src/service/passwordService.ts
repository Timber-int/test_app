import { IUser } from '../entity';

class PasswordService {
    public async userNormalization(userToNormalize: any): Promise<IUser> {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field: string) => {
            delete userToNormalize[field];
        });
        return userToNormalize;
    }
}

export const passwordService = new PasswordService();
