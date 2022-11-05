import { Router } from 'express';

import { STATUS } from '../errorCode';
import { nameRouter } from './namesRouter';

const router = Router();

router.use('/names', nameRouter);

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
