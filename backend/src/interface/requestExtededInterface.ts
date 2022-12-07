import { Request } from 'express';
import {
    IComment, IPost, IPostVideo, IUser,
} from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    user?: IUser,
    post?: IPost,
    comment?: IComment,
    video?:IPostVideo,
}
