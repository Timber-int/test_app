import { NextFunction, Request, Response } from 'express';
import { genderCategoryService } from '../service';
import { IRequestExtended } from '../interface';
import { IGenderCategory } from '../entity';

class GenderCategoryController {
    public async getAllGenderCategory(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderCategories = await genderCategoryService.getAllGenderCategory(Number(req.params.id));

            res.json({ data: genderCategories });
        } catch (e) {
            next(e);
        }
    }

    public async createGenderCategory(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const genderCategory = await genderCategoryService.createGenderCategory(req.body);

            res.json({ data: genderCategory });
        } catch (e) {
            next(e);
        }
    }

    public async deleteGenderCategoryById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.genderCategory as IGenderCategory;

            await genderCategoryService.deleteGenderCategoryById(Number(id));

            res.json({ data: req.genderCategory });
        } catch (e) {
            next(e);
        }
    }
}

export const genderCategoryController = new GenderCategoryController();
