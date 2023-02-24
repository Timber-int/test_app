import { Router } from 'express';

import { STATUS } from '../errorCode';
import { authRouter } from './authRouter';
import { categoryRouter } from './categoryRouter';
import { genderRouter } from './genderRouter';
import { productRouter } from './productRouter';
import { productInformationRouter } from './productInformationRouter';
import { productSizeRouter } from './productSizeRouter';
import { productPhotoRouter } from './productPhotoRouter';
// import { userRouter } from './userRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/genders', genderRouter);
router.use('/products', productRouter);
router.use('/productInformation', productInformationRouter);
router.use('/productSizes', productSizeRouter);
router.use('/productPhotos', productPhotoRouter);
// router.use('/users', userRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.status || STATUS.CODE_500)
        .json({
            message: err.message,
            data: err.data,
        });
});

export const apiRouter = router;
