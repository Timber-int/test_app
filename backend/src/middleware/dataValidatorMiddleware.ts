import { NextFunction, Response } from 'express';
import { ErrorHandler } from '../errorHandler';
import { IRequestExtended } from '../interface';

class DataValidatorMiddleware {
    public async dataValidator(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const validationType = req.chosenValidationType;

            const { error, value } = validationType.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const dataValidatorMiddleware = new DataValidatorMiddleware();
