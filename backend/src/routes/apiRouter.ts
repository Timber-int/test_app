import { Router } from 'express';

import { STATUS } from '../errorCode';
import { authRouter } from './authRouter';
import { userRouter } from './userRouter';
import { categoryRouter } from './categoryRouter';
import { dishRouter } from './dishRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/dishes', dishRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);

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
