import { NextFunction, Response, Router } from 'express';
import { nameController } from '../controller';
import { IRequestExtended } from '../interface';
import { dataValidatorMiddleware, nameMiddleware } from '../middleware';
import { createNameValidator, updateNameRankValidator } from '../validator';

const router = Router();

router.get('/', nameController.getAllNames);
router.get('/:id', nameMiddleware.checkIsNameExist, nameController.getNameById);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createNameValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    nameController.createName,
);
router.put('/update/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createNameValidator;
        next();
    },
    nameMiddleware.checkIsNameExist,
    dataValidatorMiddleware.dataValidator,
    nameController.updateNameById,
);

router.put('/set/:id', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = updateNameRankValidator;
    next();
}, dataValidatorMiddleware.dataValidator, nameMiddleware.checkIsNameExist, nameMiddleware.checkIsNameRankNotExist, nameController.updateNameRankById);
router.delete('/delete/:id', nameMiddleware.checkIsNameExist, nameController.deleteNameById);

export const nameRouter = router;
