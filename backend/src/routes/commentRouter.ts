import { NextFunction, Response, Router } from 'express';
import { commentController } from '../controller';
import { commentMiddleware, dataValidatorMiddleware } from '../middleware';
import { IRequestExtended } from '../interface';
import { commentBodyValidateForCreate } from '../validation';

const router = Router();

router.get('/', commentController.getAllComments);
router.delete('/:id', commentMiddleware.checkIsCommentById, commentController.deleteCommentById);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = commentBodyValidateForCreate;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    commentMiddleware.checkIsCommentByUserId,
    commentMiddleware.checkIsCommentByPostId,
    commentController.createComment);

export const commentRouter = router;
