import { Request } from 'express';
import { ICategory, IGender, IUser } from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    userRoles?: string[],
    user?: IUser,
    category?:ICategory,
    gender?:IGender,
}
