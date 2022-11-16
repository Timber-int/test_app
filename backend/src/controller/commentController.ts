import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { commentService } from '../service';
import { IUser } from '../entity';

class CommentController {
    public async getAllComments(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const comments = await commentService.getAllComments();

            res.json({ comments });
        } catch (e) {
            next(e);
        }
    }

    public async createComment(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { firstName, lastName } = req.user as IUser;

            const comment = await commentService.createComment({
                ...req.body,
                authorFirstName: firstName,
                authorLastName: lastName,
            });

            res.json({ comment });
        } catch (e) {
            next(e);
        }
    }

    public async deleteCommentById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const comment = await commentService.getCommentById(Number(req.params.id));

            await commentService.deleteCommentById(Number(req.params.id));

            res.json({ comment });
        } catch (e) {
            next(e);
        }
    }
}

export const commentController = new CommentController();
