import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import { STATUS } from '../errorCode';
import { nameRouter } from './namesRouter';
// eslint-disable-next-line import/extensions
import docs from '../docs/swagger.json';

const router = Router();

router.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));
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
