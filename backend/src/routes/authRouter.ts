import { NextFunction, Router, Response } from 'express';
import { authController } from '../controller';
import { IRequestExtended } from '../interface';
import { authMiddleware, dataValidatorMiddleware, userMiddleware } from '../middleware';
import { loginDataValidator, registrationDataValidator } from '../validation';

const router = Router();

router.post(
    '/registration',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = registrationDataValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    userMiddleware.checkIsUserExistsOnDB,
    authMiddleware.checkIsUserAdministrator,
    authController.registration,
);
router.post('/login', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = loginDataValidator;
    next();
}, dataValidatorMiddleware.dataValidator, userMiddleware.checkIsUserByEmailExist, authController.login);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;
