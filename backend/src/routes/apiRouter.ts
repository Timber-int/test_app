import { Router } from 'express';

import { STATUS } from '../errorCode';
import { productRouter } from './productRouter';
import { commentRouter } from './commentRouter';

const router = Router();

router.use('/products', productRouter);
router.use('/comments', commentRouter);

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
