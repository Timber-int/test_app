import { Router } from 'express';
import { commentController } from '../controller';
import { commentMiddleware } from '../middleware';

const router = Router();

router.get('/', commentController.getAllComments);
router.post('/', commentMiddleware.checkIsProductForCommentExist, commentController.createComment);
router.delete('/:id', commentController.deleteComment);

export const commentRouter = router;
