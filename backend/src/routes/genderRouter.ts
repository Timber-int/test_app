import { NextFunction, Response, Router } from 'express';
import { genderController } from '../controller';
import { dataValidatorMiddleware, genderMiddleware } from '../middleware';
import { IRequestExtended } from '../interface';
import { createGenderValidator } from '../validation';

const router = Router();

router.get('/', genderController.getAllGenders);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createGenderValidator;
    next();
}, dataValidatorMiddleware.dataValidator, genderMiddleware.checkIsGenderByTitleExist, genderController.createGender);
router.delete('/:id', genderMiddleware.checkIsGenderByIdExist, genderController.deleteGenderById);

export const genderRouter = router;
