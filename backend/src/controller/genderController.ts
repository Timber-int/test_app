import { NextFunction, Request, Response } from 'express';
import { genderService } from '../service';
import { IRequestExtended } from '../interface';
import { IGender } from '../entity';

class GenderController {
    public async getAllGenders(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genders = await genderService.getAllGenders();

            res.json({ data: genders });
        } catch (e) {
            next(e);
        }
    }

    public async createGender(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const gender = await genderService.createGender(req.body);

            res.json({ data: gender });
        } catch (e) {
            next(e);
        }
    }

    public async deleteGenderById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.gender as IGender;

            await genderService.deleteGenderById(Number(id));

            res.json({ data: req.gender });
        } catch (e) {
            next(e);
        }
    }
}

export const genderController = new GenderController();
