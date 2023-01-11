import { NextFunction, Response, Router } from 'express';
import { IRequestExtended } from '../interface';
import {
    forgotPasswordDataValidator,
    forgotPasswordSetDataValidator,
    loginDataValidator,
    registrationDataValidator,
} from '../validation';
import { authMiddleware, dataValidatorMiddleware, userMiddleware } from '../middleware';
import { authController } from '../controller';
import { UserRole } from '../constants';

const router = Router();

router.post('/registration', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = registrationDataValidator;
    next();
}, dataValidatorMiddleware.dataValidator, userMiddleware.checkIsUserEmailUnique, authMiddleware.setRole, authController.registration);
router.post('/login', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = loginDataValidator;
    req.userRoles = [UserRole.ADMIN, UserRole.USER, UserRole.MANAGER];
    next();
}, dataValidatorMiddleware.dataValidator, userMiddleware.checkIsUserExistByEmail, userMiddleware.checkUserRole, authController.login);
router.post('/logout', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.userRoles = [UserRole.ADMIN, UserRole.USER, UserRole.MANAGER];
    next();
}, authMiddleware.checkAccessToken, userMiddleware.checkUserRole, authController.logout);

router.post('/refresh', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.userRoles = [UserRole.ADMIN, UserRole.USER, UserRole.MANAGER];
    next();
}, authMiddleware.checkRefreshToken, userMiddleware.checkUserRole, authController.refresh);
router.post('/forgot/password', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.userRoles = [UserRole.ADMIN, UserRole.USER, UserRole.MANAGER];
    req.chosenValidationType = forgotPasswordDataValidator;
    next();
}, dataValidatorMiddleware.dataValidator, userMiddleware.checkIsUserExistByEmail, userMiddleware.checkUserRole, authController.forgotPassword);
router.post('/forgot/password/set', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.userRoles = [UserRole.ADMIN, UserRole.USER, UserRole.MANAGER];
    req.chosenValidationType = forgotPasswordSetDataValidator;
    next();
}, dataValidatorMiddleware.dataValidator, authMiddleware.checkActionToken, userMiddleware.checkUserRole, authController.setNewPassword);

export const authRouter = router;
