import { NextFunction, Response, Router } from 'express';
import { nameController } from '../controller';
import { IRequestExtended } from '../interface';
import { dataValidatorMiddleware, nameMiddleware } from '../middleware';
import { createNameValidator } from '../validator';

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
router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createNameValidator;
        next();
    },
    nameMiddleware.checkIsNameExist,
    dataValidatorMiddleware.dataValidator,
    nameController.updateNameById,
);
router.delete('/:id', nameMiddleware.checkIsNameExist, nameController.deleteNameById);

export const nameRouter = router;
