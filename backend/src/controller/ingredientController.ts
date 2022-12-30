import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { ingredientService } from '../service';

class IngredientController {
    public async getAllIngredients(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const ingredients = await ingredientService.getAllIngredients();

            res.json({ ingredients });
        } catch (e) {
            next(e);
        }
    }

    public async createIngredient(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const ingredient = await ingredientService.createIngredient(req.body);

            res.json({ ingredient });
        } catch (e) {
            next(e);
        }
    }

    public async getByIngredientById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const ingredient = await ingredientService.getByIngredientById(Number(req.params.id));

            await ingredientService.deleteIngredientById(Number(req.params.id));

            res.json({ ingredient });
        } catch (e) {
            next(e);
        }
    }
}

export const ingredientController = new IngredientController();
