import { NextFunction, Request, Response } from 'express';
import { commentService } from '../service';

class CommentController {
    public async getAllComments(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const comments = await commentService.getAllComments();

            res.json({ commentsData: comments });
        } catch (e) {
            next(e);
        }
    }

    public async createComment(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const comment = await commentService.createComment(req.body);

            res.json({ commentData: comment });
        } catch (e) {
            next(e);
        }
    }
}

export const commentController = new CommentController();
