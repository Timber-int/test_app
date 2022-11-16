import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { passwordService, userService } from '../service';

class UserController {
    public async getUserById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const user = await userService.getUserById(Number(req.params.id));

            const userNormalized = await passwordService.userNormalization(user);

            res.json({ user: userNormalized });
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
