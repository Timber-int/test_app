import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { commentService, postService, userService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class CommentMiddleware {
    public async checkIsCommentById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const commentFromDB = await commentService.getCommentById(Number(req.params.id));

            if (!commentFromDB) {
                next(new ErrorHandler(MESSAGE.COMMENT_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCommentByPostId(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const postFromDB = await postService.getPostById(req.body.postId);

            if (!postFromDB) {
                next(new ErrorHandler(MESSAGE.POST_NOT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCommentByUserId(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userFromDB = await userService.getUserById(req.body.userId);

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

export const commentMiddleware = new CommentMiddleware();
