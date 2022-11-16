import { NextFunction, Response, Router } from 'express';
import { postController } from '../controller';
import { dataValidatorMiddleware, fileMiddleware, postMiddleware } from '../middleware';
import { IRequestExtended } from '../interface';
import { postBodyValidateForCreate, postBodyValidateForUpdate } from '../validation';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = postBodyValidateForCreate;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    fileMiddleware.checkIsPhotoFileExist,
    postMiddleware.checkIsPostHaveUser,
    postMiddleware.checkIsPostExistsByTitle,
    postController.createPost,
);
router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = postBodyValidateForUpdate;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    fileMiddleware.checkIsPhotoToUpdateFileExist,
    postMiddleware.checkIsPostExistById,
    postMiddleware.checkIsPostExistsByTitle,
    postController.updatePostById,
);

router.delete('/:id', postMiddleware.checkIsPostExistById, postController.deletePostById);

export const postRouter = router;
