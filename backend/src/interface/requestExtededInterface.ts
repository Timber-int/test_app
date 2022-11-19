import { Request } from 'express';
import { IComment, IPost, IUser } from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    user?: IUser,
    post?: IPost,
    comment?: IComment,
}
