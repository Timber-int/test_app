import { Request } from 'express';
import { IPost, IUser } from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    user?: IUser,
    post?: IPost,
}
