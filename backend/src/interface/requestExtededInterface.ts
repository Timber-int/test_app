import { Request } from 'express';
import { IDish, IDishVideo, IUser } from '../entity';

export interface IRequestExtended extends Request {
    chosenValidationType?: any,
    user?: IUser,
    video?:IDishVideo,
    dish?:IDish,
}
