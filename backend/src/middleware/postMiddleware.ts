import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { postService, userService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class PostMiddleware {
    public async checkIsPostExistById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const postFromDB = await postService.getPostById(Number(req.params.id));

            if (!postFromDB) {
                next(new ErrorHandler(MESSAGE.POST_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.post = postFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsVideoExistById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const videoFromDB = await postService.getVideoById(Number(req.params.id));

            if (!videoFromDB) {
                next(new ErrorHandler(MESSAGE.VIDEO_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.video = videoFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsVideoHavePostId(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const postFromDB = await postService.getPostById(Number(req.body.postId));

            if (!postFromDB) {
                next(new ErrorHandler(MESSAGE.POST_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.post = postFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsPostExistsByTitle(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const postFromDB = await postService.findPostByTitle(req.body.title);

            if (postFromDB) {
                next(new ErrorHandler(MESSAGE.POST_IS_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsPostHaveUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userFromDB = await userService.getUserById(Number(req.body.userId));

            if (!userFromDB) {
                next(new ErrorHandler(MESSAGE.USER_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            req.user = userFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();
