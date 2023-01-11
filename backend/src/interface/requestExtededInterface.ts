import { Request } from 'express';
import { IUser } from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    userRoles?: string[],
    user?: IUser,
}
